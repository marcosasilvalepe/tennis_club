<?php

declare(strict_types=1);
require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once 'dbh.inc.php';

//CHANGE Access-Control-Allow-Origin HEADER IN PRODUCTION
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function generate_jwt_token($user_data) {

    global $jwt_secret_key;
    global $conn;

    $payload = [
        'iss' => "cva",
        'iat' => time(),
        'exp' => time() + (60 * 10),
        'user' => [
            'id' => $user_data["id"],
            'email' => $user_data["email"],
            'phone' => $user_data["phone"],
            'name' => $user_data["name"],
            'last_name' => $user_data["last_name"],
            'sex' => $user_data["sex"],
            'birth_date' => $user_data["birth_date"],
            'height' => $user_data["height"],
            'weight' => $user_data["weight"], 
            'category' => [
                'id' => $user_data["category"],
                'name' => $user_data["category_name"],
                'code' => $user_data["category_code"]
            ],
            'drive' => $user_data["drive"],
            'backhand' => $user_data['backhand'],
            'profile_image' => $user_data["profile_image"],
            'reservations' => $user_data['reservations']
        ]
    ];

    $headers = ['x-forwarded-for' => 'localhost'];

    // Sign the token.
    $jwt_token = JWT::encode($payload, $jwt_secret_key, 'HS256', null, $headers);
    return $jwt_token;
}

function generate_refresh_token($user_id) {

    global $conn;
    global $refresh_secret_key;
    global $persist_session;

    $refresh_token_headers = ['x-forwarded-for' => 'localhost'];
    $refresh_token_expiration = ($persist_session) ? time() + (60 * 60 * 24 * 180) : time() + (60 * 60 * 24);
    $refresh_token_array = array(
        'iss' => "cva",
        'iat' => time(),
        'exp' => $refresh_token_expiration,
        'user_id' => $user_id
    );
    
    //SAVE REFRESH TOKEN
    $refresh_token = JWT::encode($refresh_token_array, $refresh_secret_key, 'HS256', null, $refresh_token_headers);
    mysqli_query($conn, "UPDATE users SET refresh_token='$refresh_token' WHERE id=$user_id;");

    return array(
        "refresh_token" => $refresh_token,
        "expiration" => $refresh_token_expiration 
    );
}

$data = (array) json_decode(file_get_contents("php://input"));

$user = sanitize($data["user"]);
$password = sanitize($data["password"]);
$persist_session = ($data["persist_session"] === null) ? FALSE : $data["persist_session"];

$response = array();
$response["success"] = FALSE;

try {

    /******************** USER HAS A REFRESH TOKEN ************************/
    if (isset($_COOKIE['cvaRefreshToken']) && $user === '' && $password === '') {

        $refresh_token = $_COOKIE['cvaRefreshToken'];
        $decoded_refresh_token = (array) JWT::decode($refresh_token, new Key($refresh_secret_key, 'HS256'));

        //TOKEN HAS EXPIRED
        $token_expiration = $decoded_refresh_token["exp"];
        if (time() > $token_expiration) throw new Exception("user token has expired");

        //TOKEN IS STILL VALID SO USER TOKEN GETS UPDATED
        $user_id = $decoded_refresh_token['user_id'];
        $user_data= select_query("
            SELECT users.*, categories.name AS category_name, categories.code AS category_code
            FROM users 
            INNER JOIN categories ON users.category=categories.id
            WHERE users.id=$user_id;
        ");

        //GET RESERVED HOURS
        $date = date("Y-m-d");
        $user_id = $user_data[0]["id"];
        $reserved_hours = select_query("
            SELECT reservations.*, reservation_hours.hour
            FROM reservations 
            INNER JOIN reservation_hours ON reservations.hour_id=reservation_hours.id
            WHERE reservations.user_id=$user_id AND reservations.date >= '$date';
        ");
        $user_data[0]["reservations"] = $reserved_hours;

        $jwt_token = generate_jwt_token($user_data[0]);

        $response["token"] = $jwt_token;
        $response["token_refreshed"] = TRUE;

        //SEND TOKEN TO THE USER
        // Set the refresh token as a secure, HTTP-only, and SameSite=Strict cookie
        setcookie('cvaJwtToken', $jwt_token, time() + (60 * 10), '/', '', true, true);
        $response["success"] = TRUE;

    }

    /******************* THERE'S NO REFRESH TOKEN OR REFRESH TOKE HAS EXPIRED *********************/
    else {

        if (strlen($user) === 0) throw new Exception('user is empty');
        if (strlen($password) === 0) throw new Exception('password is empty');

        $field = (str_contains($user, "@")) ? "email" : "phone";
        $user_data = select_query("
            SELECT users.*, categories.name AS category_name, categories.code AS category_code
            FROM users 
            INNER JOIN categories ON users.category=categories.id
            WHERE users.$field=LOWER('$user');
        ");

        //USER DOESN'T EXISTS
        if (count($user_data) === 0) throw new Exception("user not found");
        
        //USER FOUND IN DATABASE
        $hashed_password = $user_data[0]["password"];
        $password_matches = password_verify($password, $hashed_password);

        //PASSWORD DOESN'T MATCH
        if (!$password_matches) throw new Exception("password doesn't match");

        /******* PASSWORD MATCHES -> LOG USER IN *******/

        //GET RESERVED HOURS
        $date = date("Y-m-d");
        $user_id = $user_data[0]["id"];
        $reserved_hours = select_query("
            SELECT * 
            FROM reservations 
            WHERE user_id=$user_id AND date >= '$date';
        ");
        $user_data[0]["reservations"] = $reserved_hours;

        //GENERATE JWT TOKEN
        $jwt_token = generate_jwt_token($user_data[0]);

        /*************** VALIDATE REFRESH TOKEN STORED IN DATABASE */
        if ($user_data[0]["refresh_token"] !== NULL) {

            $decoded_refresh_token = (array) JWT::decode($user_data[0]["refresh_token"], new Key($refresh_secret_key, 'HS256'));
            $token_expiration = $decoded_refresh_token["exp"];

            //TOKEN IS EXPIRED
            if (time() > $token_expiration) {
                $refresh_token_data = generate_refresh_token($user_id);
                $refresh_token = $refresh_token_data["refresh_token"];
                $refresh_token_expiration = $refresh_token_data["expiration"];
            }

            //TOKEN IS STILL VALID
            else {
                $refresh_token = $user_data[0]["refresh_token"];
                $refresh_token_expiration = $decoded_refresh_token["exp"];
            }

        }

        //NO REFRESH TOKEN
        else {
            $refresh_token_data = generate_refresh_token($user_id);
            $refresh_token = $refresh_token_data["refresh_token"];
            $refresh_token_expiration = $refresh_token_data["expiration"];
        }
        
        //SEND TOKEN TO THE USER
        $response["token"] = $jwt_token;

        // Set the refresh token as a secure, HTTP-only, and SameSite=Strict cookie
        setcookie('cvaJwtToken', $jwt_token, time() + (60 * 10), '/', '', true, true);
        setcookie('cvaRefreshToken', $refresh_token, $refresh_token_expiration, '/', '', true, true);
        $response["success"] = TRUE;
    }
}
catch (Exception $e) { $response["error"] = $e->getMessage(); }
finally { echo json_encode($response); }