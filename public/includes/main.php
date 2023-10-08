<?php

declare(strict_types=1);
require_once('../../vendor/autoload.php');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once 'dbh.inc.php';

//GET ACTIVE HOURS FOR MAIN PAGE
if (isset($_GET['get_hours'])) {

    $response = array();
    $response['success'] = False;

    try {

        $response = array();
        $response['success'] = False;
        
        $now = date("Y-m-d h:m:s");
        $date = explode(' ', $now)[0];
        $hour = explode(' ', $now)[1];

        $current_day = explode("-", $date)[1];
        $last_day_of_the_month = date("Y-m-t", strtotime($date));
        $last_day = explode("-", $last_day_of_the_month)[2];

        $next_day = date('Y-m-d', strtotime($date . ' + 1 days'));
        $day_after_next = date('Y-m-d', strtotime($date . ' + 2 days'));

        $target_dates = array($date, $next_day, $day_after_next);

        //GET ACTIVE HOURS
        $active_hours = select_query("SELECT id, hour FROM reservation_hours WHERE active=1");

        //CREATE ARRAY WITH day AS PROPERTY AND hours AS AN ARRAY WITH THE HOURS THAT CAN BE RESERVED
        $dates_array = array();
        foreach ($target_dates as $day) {

            $day_array = array();
            $day_array['day'] = $day;
            $day_array['hours'] = $active_hours;
            array_push($dates_array, $day_array);

        }


        //CHECK TAKEN HOURS FOR EACH DAY
        foreach ($dates_array as &$day) {
            foreach ($day['hours'] as &$row) {

                $hour = $row['hour'];
                $target_date = $day['day'];

                $taken_hours = select_query("
                    SELECT res.id
                    FROM reservations res 
                    INNER JOIN users ON res.user_id=users.id
                    INNER JOIN reservation_hours hours ON res.hour_id=hours.id
                    WHERE res.date='$target_date' AND hours.hour='$hour';
                ");

                $row['taken_hours'] = count($taken_hours);
            }
        }

        $response['active_hours'] = $active_hours;
        $response['days'] = $dates_array;
        $response['success'] = True;
    }
    catch(Exception $e) {
        $response['success'] = False;
        $response['error'] = strval($e);
    }
    finally { echo json_encode($response); }
}

else if (isset($_GET['get_taken_courts'])) {

    $response = array("success" => FALSE);

    try {

        $now = date("Y-m-d");
        $rows = select_query("
            SELECT reservations.* 
            FROM reservations 
            INNER JOIN reservation_hours hours ON reservations.hour_id=hours.id
            WHERE reservations.date >= '$now'
            ORDER BY date ASC, hour_id ASC;
        ");

        $dates = array();

        $current_date = NULL;
        for ($i = 0; $i < count($rows); $i++) {

            $date = $rows[$i]["date"];
            
            if ($current_date === $date) continue;
            $current_date = $date;

            $date_array = array(
                "date" => $date,
                "hours" => []
            );

            $current_id = NULL;
            for ($j = $i; $j < count($rows); $j++) {

                $hour_id = $rows[$j]["hour_id"];

                if ($rows[$j]["date"] !== $current_date) break;
                if ($current_id === $hour_id) continue;
                $current_id = $hour_id;

                $taken_courts = 0;
                for ($k = $j; $k < count($rows); $k++) {
                    if ($rows[$k]["hour_id"] !== $current_id || $rows[$k]["date"] !== $current_date) break;
                    $taken_courts++;
                }

                $hour = array(
                    "id" => $current_id,
                    "takenCourts" => $taken_courts
                );
                array_push($date_array["hours"], $hour);
            }

            array_push($dates, $date_array);
        }

        $response["dates"] = $dates;
        $response["success"] = TRUE;

    }
    catch (Exception $e) { $response["error"] = strval($e); }
    finally { echo json_encode($response); }
}

//LOG USER OUT
else if (isset($_GET['logout'])) {

    $response = array();
    $response["success"] = FALSE;

    try {

        // Get the JWT token from the HTTP-only cookie
        $jwtCookie = $_COOKIE['cvaJwtToken'] ?? '';

        $decoded = JWT::decode($jwtCookie, new Key($jwt_secret_key, 'HS256'));
        $user_id = $decoded -> user -> id;

        mysqli_query($conn, "UPDATE users SET refresh_token=NULL WHERE id=$user_id;");

        setcookie('cvaJwtToken', '', time() - (60 * 60 * 24), '/', '', true, true);
        setcookie('cvaRefreshToken', '', time() - (60 * 60 * 24), '/', '', true, true);

        $response["success"] = TRUE;

    }
    catch (Exception $e) { $response["error"] = $e->getMessage(); }
    finally { echo json_encode($response); }
}


else if (isset($_GET['test'])) {


    $response = array();
    $response['success'] = False;
    
    $now = date("Y-m-d h:m:s");
    $date = explode(' ', $now)[0];
    $hour = explode(' ', $now)[1];

    $current_day = explode("-", $date)[1];
    $last_day_of_the_month = date("Y-m-t", strtotime($date));
    $last_day = explode("-", $last_day_of_the_month)[2];

    $next_day = date('Y-m-d', strtotime($date . ' + 1 days'));
    $day_after_next = date('Y-m-d', strtotime($date . ' + 2 days'));

    $target_dates = array($date, $next_day, $day_after_next);

    //GET ACTIVE HOURS
    $active_hours = select_query("SELECT id, hour FROM reservation_hours WHERE active=1");


    //CREATE ARRAY WITH day AS PROPERTY AND hours AS AN ARRAY WITH THE HOURS THAT CAN BE RESERVED
    $dates_array = array();
    foreach ($target_dates as $day) {

        $day_array = array();
        $day_array['day'] = $day;
        $day_array['hours'] = $active_hours;
        array_push($dates_array, $day_array);

    }


    //CHECK TAKEN HOURS FOR EACH DAY
    foreach ($dates_array as &$day) {
        foreach ($day['hours'] as &$row) {

            $hour = $row['hour'];
            $target_date = $day['day'];

            $taken_hours = select_query("
                SELECT res.id
                FROM reservations res 
                INNER JOIN users ON res.user_id=users.id
                INNER JOIN reservation_hours hours ON res.hour_id=hours.id
                WHERE res.date='$target_date' AND hours.hour='$hour';
            ");

            $row['taken_hours'] = count($taken_hours);
        }
    }

    var_dump($dates_array);
}

?>