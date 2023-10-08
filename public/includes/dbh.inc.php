<?php

/* Prevent XSS input */
//$_GET   = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
//$_POST  = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
/* I prefer not to use $_REQUEST...but for those who do: */

$_REQUEST = (array)$_POST + (array)$_GET + (array)$_REQUEST;
$db_server_name = "localhost";
$db_user_name = "root";
$db_password = 'M@r$l1985_:)';
$db_name = "tenis";
$conn = mysqli_connect($db_server_name, $db_user_name, $db_password, $db_name);
$acentos = $conn->query("SET NAMES 'utf8'");

$jwt_secret_key = 'pFSejiUlNNOgzyXraUreIAl3BRu4oKpC';
$refresh_secret_key = 'Gm5gp8IJGDbwpvHYkk6uWMY4W7a8Bw4u';

function select_query($query) {
    global $db_server_name;
    global $db_user_name;
    global $db_password;
    global $db_name;
	$mysqli = new mysqli($db_server_name, $db_user_name, $db_password, $db_name); 

	$result = $mysqli->query($query);
    if ($result !== FALSE)
    	$result = $result->fetch_all(MYSQLI_ASSOC);

    $mysqli->close();
    return $result;
}

function sanitize($input) {
    global $conn;
    $input = trim($input);
    $input = stripslashes($input);
    $input = mysqli_real_escape_string($conn, $input);
    $input = htmlspecialchars($input);
    return $input;
}

function base64url_encode($data) {
    $encoded = base64_encode($data);
    $encoded = strtr($encoded, '+/', '-_');
    $encoded = rtrim($encoded, '=');
    return $encoded;
}

