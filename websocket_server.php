<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

require __DIR__ . '/public/includes/dbh.inc.php';

function get_reserved_hours() {

    global $conn;

    $date = date("Y-m-d");

    $taken_hours = select_query("
        SELECT * FROM reservations WHERE date >= '$date'
        ORDER BY date ASC, hour_id ASC, last_update ASC;
    ");

    $current_id = null;
    $reserved_hours = array();

    for ($i = 0; $i < count($taken_hours); $i++) { 

        if ($current_id === $taken_hours[$i]["hour_id"]) continue;
        $current_id = $taken_hours[$i]["hour_id"];

        $hour_array = array();
        $hours_array["date"] = $taken_hours[$i]["date"];
        $hours_array["hour_id"] = $current_id;
        $hours_array["hours"] = array();

        for ($j = $i; $j < count($taken_hours); $j++) { 
            
            if ($taken_hours[$j]["hour_id"] !== $current_id) break;

            $hour = array();
            $hour["id"] = $taken_hours[$j]["id"];
            $hour["user_id"] = $taken_hours[$j]["user_id"];
            $hour["comments"] = $taken_hours[$j]["comments"];
            $hour["last_update"] = $taken_hours[$j]["last_update"];
            array_push($hours_array["hours"], $hour);

        }

        array_push($reserved_hours, $hours_array);
    }

    return $reserved_hours;
}

function check_court_availability($date, $hour_id) {

    global $conn;

    $taken_hours_query = select_query("SELECT COUNT(*) FROM reservations WHERE date='$date' AND hour_id=$hour_id;");
    $taken_hours = count($taken_hours_query);

    if ($taken_hours < 6) return TRUE;
    else return FALSE;
}

class MyWebSocketApp implements MessageComponentInterface {
    
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage();
    }

    public function onOpen(ConnectionInterface $connection) {
        // Handle a new WebSocket connection

        //Add the client's connection to the list of clients
        $this->clients->attach($connection);

        echo "New connection! ({$connection->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Handle incoming WebSocket message

        global $conn;
        global $jwt_secret_key;

        echo "Message received from {$from->resourceId}: $msg\n";

        $data = (array) json_decode($msg);

        print_r($data);

        if ($data["msg"] === "get available courts") {

            
        }

        else if ($data["msg"] === "get my reservations") {

            $response = array("success" => FALSE);

            try {

                //VALIDATE JWT TOKEN
                $decoded = JWT::decode($data['token'], new Key($jwt_secret_key, 'HS256'));
                $user_id = $decoded->user->id;

                $now = date("Y-m-d");

                $reservations = select_query("
                    SELECT * FROM reservations WHERE user_id=$user_id AND date >= '$now';
                ");

                $response["reservations"] = $reservations;
                $response["success"] = TRUE;

            }

            catch (Exception $e) { $response["error"] = strval($e);  }
            finally { $from->send(json_encode($response)); }
        }

        //USER RESERVED HOUR
        else if ($data["msg"] === "save hour") {

            try {

                //VALIDATE JWT TOKEN
                $decoded = JWT::decode($data['token'], new Key($jwt_secret_key, 'HS256'));
                $user_id = $decoded -> user -> id;

                $date_to_reserve = $data["date"];
                $hour_id = $data["hour_id"];

                //THERE IS AVAILABILITY FOR THE COURT
                if (check_court_availability($date_to_reserve, $hour_id)) {

                    mysqli_query($conn, "
                        INSERT INTO reservations (date, hour_id, user_id, comments, last_update)
                        VALUES ('$date_to_reserve', $hour_id, $user_id, 'socket test', NOW());
                    ");

                    $response = array(
                        "msg" => "hour reserved by user",
                        "dateToReserve" => $date_to_reserve,
                        "hourId" => $hour_id,
                        "userId" => $user_id,
                        "reservedHours" => get_reserved_hours()
                    );

                    // Send the message to all connected clients
                    foreach ($this->clients as $client) {
                        $client->send(json_encode($response));
                    }
                }

                //ALL THE COURTS HAVE ALREADY BEEN TAKEN
                else {

                    $response = array(
                        "error" => TRUE,
                        "msg" => "no available courts",
                        "dateToReserve" => $date_to_reserve,
                        "hourId" => $hour_id,
                        "userId" => $user_id,
                    );

                    $from->send(json_encode($response));
                }
            }
            catch (Exception $e) {  }
        }

        else if ($data["msg"] === "delete saved hour") {

            try {

                //VALIDATE JWT TOKEN
                $decoded = JWT::decode($data['token'], new Key($jwt_secret_key, 'HS256'));
                $user_id = $decoded -> user -> id;

                $date_to_delete = $data["date"];
                $hour_id = $data["hour_id"];

                mysqli_query($conn, "
                    DELETE FROM reservations
                    WHERE user_id=$user_id AND date='$date_to_delete' AND hour_id=$hour_id;
                ");

                //$reserved_hours = select_query();

                $response = array(
                    "msg" => "hour deleted by user",
                    "dateToDelete" => $date_to_delete,
                    "hourId" => $hour_id,
                    "userId" => $user_id,
                    "reservedHours" => get_reserved_hours()
                );

                // Send the message to all connected clients
                foreach ($this->clients as $client) {
                    $client->send(json_encode($response));
                }

            } catch(Exception $e) {  }
        }
    }

    public function onClose(ConnectionInterface $connection) {
        // Handle WebSocket connection close

        //Remove the client's connection from the list of clients
        $this->clients->detach($connection);

        echo "Connection closed ({$connection->resourceId})\n";
    }

    public function onError(ConnectionInterface $connection, \Exception $e) {
        // Handle WebSocket error
        echo "An error occurred: {$e->getMessage()}\n";
        $connection->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new MyWebSocketApp()
        )
    ),
    6060  // Use the desired port number
);

echo "Server started.\n";

$server->run();