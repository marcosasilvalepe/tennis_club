<?php

declare(strict_types=1);
require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once 'dbh.inc.php';

$data = (array) json_decode(file_get_contents("php://input"));

$response = array();
$response["success"] = FALSE;

try {

    $jwtCookie = $_COOKIE['cvaJwtToken'] ?? '';
    if (!$jwtCookie) throw new Exception("No authorization token found");

    //VALIDATE JWT TOKEN
    $decoded = JWT::decode($jwtCookie, new Key($jwt_secret_key, 'HS256'));
    $user_id = intval($decoded -> user -> id);

    $new_password = $data["new_password"];
    $cost = [ "cost" => 12 ];
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT, $cost);

    mysqli_query($conn, "
        UPDATE users
        SET password='$hashed_password'
        WHERE id=$user_id;
    ");

    $response["success"] = TRUE;
}
catch (Exception $e) { $response["error"] = $e->getMessage(); }
finally { echo json_encode($response); }

?>