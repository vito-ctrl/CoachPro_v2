<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    require_once __DIR__ . '/../config/db.php';
    require_once __DIR__ . '/../classes/Reservation.php';

    $database = new Database();
    $conn = $database->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET'){
        $reservation = Bookings::getAll($conn);
        echo json_encode($reservation);
        exit;
    }

    if ($method == 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $session_id = $data['session_id'] ?? null;
        $user_id = $data['user_id'] ?? null;

        if(!$session_id || !$user_id){
            http_response_code(400);
            echo json_encode(["error" => "Missing fields"]);
            exit;
        }

        $newReservation = Bookings::create($conn, $session_id, $user_id);

        if ($newReservation) {
            echo json_encode([
                "success" => true,
                "booking_id" => $newReservation
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Could not complete reservation"]);
        }
        exit;
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
?>