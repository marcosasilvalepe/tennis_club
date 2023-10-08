<?php

declare(strict_types=1);
require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once 'dbh.inc.php';

function resize_image($source_url) {

	//separate the file name and the extention
	$source_url_parts = pathinfo($source_url);
	$filename = $source_url_parts['filename'];
	$extension = $source_url_parts['extension'];

	//define the quality from 1 to 100
	$quality = 10;

	//detect the width and the height of original image
	list($width, $height) = getimagesize($source_url);
	$width;
	$height;

	//define any width that you want as the output. mine is 200px.
	$after_width = 400;

	//resize only when the original image is larger than expected with.
	//this helps you to avoid from unwanted resizing.
    if ($width < $after_width) return;
	
    //get the reduced width
    $reduced_width = ($width - $after_width);
    //now convert the reduced width to a percentage and round it to 2 decimal places
    $reduced_radio = round(($reduced_width / $width) * 100, 2);

    //ALL GOOD! let's reduce the same percentage from the height and round it to 2 decimal places
    $reduced_height = round(($height / 100) * $reduced_radio, 2);
    //reduce the calculated height from the original height
    $after_height = $height - $reduced_height;

    //Now detect the file extension
    //if the file extension is 'jpg', 'jpeg', 'JPG' or 'JPEG'
    if ($extension == 'jpg' || $extension == 'jpeg' || $extension == 'JPG' || $extension == 'JPEG') {
        //then return the image as a jpeg image for the next step
        $img = imagecreatefromjpeg($source_url);
    } elseif ($extension == 'png' || $extension == 'PNG') {
        //then return the image as a png image for the next step
        $img = imagecreatefrompng($source_url);
    } else {
        //show an error message if the file extension is not available
        echo 'image extension is not supporting';
    }

    //HERE YOU GO :)
    //Let's do the resize thing
    //imagescale([returned image], [width of the resized image], [height of the resized image], [quality of the resized image]);
    $imgResized = imagescale($img, intval($after_width), intval($after_height), $quality);


    //now save the resized image with a suffix called "-resized" and with its extension. 
    imagejpeg($imgResized, '../images/profiles/' . str_replace('-L', '-S.', $filename) . $extension);

    //Finally frees any memory associated with image
    //**NOTE THAT THIS WONT DELETE THE IMAGE
    imagedestroy($img);
    imagedestroy($imgResized);
}

function delete_previous_profile_picture($user_id) {

    global $conn;

    try {

        $profile_data = select_query("SELECT profile_image FROM users WHERE id=1;");
        $rows = count($profile_data);
        
        if ($rows === 0) return;

        $path_to_image = "../images/profiles/" . $profile_data[0]["profile_image"];

        unlink($path_to_image);
        unlink(str_replace('-L.', '-S.', $path_to_image));

    }
    catch (Exception $e) {  }
}

// Get the JWT token from the HTTP-only cookie
$jwtCookie = $_COOKIE['cvaJwtToken'] ?? '';
$response = array();
$response['success'] = FALSE;

try {

    if (!$jwtCookie) throw new Exception("No authorization token found");

    //VALIDATE JWT TOKEN
    $decoded = JWT::decode($jwtCookie, new Key($jwt_secret_key, 'HS256'));
    $user_id = intval($decoded -> user -> id);
    
    //IMAGE WAS NOT SET
    if (!isset($_FILES['image'])) throw new Exception("Error uploading image");

    //MIME TYPE DOESNT MATCH IMAGE
    $mime_type = explode('/', $_FILES['image']['type']);
    if ($mime_type[0] !== 'image') throw new Exception("Error uploading image");
    
    //ERROR UPLOADING IMAGE
    $image = $_FILES['image'];
    if ($image['error'] !== UPLOAD_ERR_OK) throw new Exception("Error uploading image");

    /************** SAVE IMAGE ***********/
    $now = time();
    $file_name = $now . '-L' . '.' . $mime_type[1];
    $destination = '../images/profiles/' . $file_name;

    move_uploaded_file($image['tmp_name'], $destination);

    $source_url_parts = pathinfo($destination);
	$filename = $source_url_parts['filename'];
	$extension = $source_url_parts['extension'];
    
    //MAKE A SMALLER COPY OF THE IMAGE
    resize_image($destination);

    delete_previous_profile_picture($user_id);

    mysqli_query($conn, "
        UPDATE users
        SET profile_image='$file_name'
        WHERE id=$user_id;
    ");

    $response['success'] = TRUE;

}
catch (Exception $e) { $response["error"] = $e->getMessage(); }
finally { echo json_encode($response); }