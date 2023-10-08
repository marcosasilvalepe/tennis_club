<?php

declare(strict_types=1);
require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once 'dbh.inc.php';

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

// Get the JWT token from the HTTP-only cookie
$jwtCookie = $_COOKIE['cvaJwtToken'] ?? '';
$response = array();
$response['success'] = FALSE;

$data = (array) json_decode(file_get_contents("php://input"));

try {

    if (!$jwtCookie) throw new Exception("No authorization token found");

    //VALIDATE JWT TOKEN
    $decoded = JWT::decode($jwtCookie, new Key($jwt_secret_key, 'HS256'));
    $user_id = intval($decoded -> user -> id);
    $user_email = $decoded -> user -> email;

    //FETCH USER DATA FROM OBJECT
    $name = sanitize($data["name"]);
    $lastname = sanitize($data["lastname"]);
    $phone = preg_replace('/[^0-9] /', '', $data["phone"]);
    $birth = sanitize($data["birth"]);
    $sex = sanitize($data["sex"]);
    $height = intval(preg_replace('/[^0-9]/', '', $data["height"]));
    $weight = intval(preg_replace('/[^0-9]/', '', $data["weight"]));
    $drive = sanitize($data["drive"]);
    $backhand = sanitize($data["backhand"]);

    mysqli_query($conn, "
        UPDATE users
        SET 
            phone='$phone',
            name='$name',
            last_name='$lastname',
            sex='$sex',
            birth_date='$birth',
            height=$height,
            weight=$weight,
            drive='$drive',
            backhand='$backhand'
        WHERE id=$user_id;
    ");

    //GENERATE NEW TOKEN WITH UPDATED VALUES
    $user_data = select_query("
        SELECT users.*, categories.name AS category_name, categories.code AS category_code
        FROM users 
        INNER JOIN categories ON users.category=categories.id
        WHERE users.id=$user_id;
    ");

    $jwt_token = generate_jwt_token($user_data[0]);
    $response["jwt"] = $jwt_token;
    setcookie('cvaJwtToken', $jwt_token, time() + (60 * 10), '/', '', true, true);
    $response["success"] = TRUE;

}
catch (Exception $e) { $response["error"] = $e->getMessage(); }
finally { echo json_encode($response); }

?>