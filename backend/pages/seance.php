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
    require_once __DIR__ . '/../classes/Seance.php';

    $database = new Database();
    $conn = $database->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET'){
        $session = Seance::getAll($conn);
        echo json_encode($session);
        exit;
    }

    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $coach_id = $data['coach_id'] ?? null;
        $sport_id = $data['sport_id'] ?? null; 
        $session_date = $data['session_date'] ?? null; 
        $session_time = $data['session_time'] ?? null;
        $duration = $data['duration'] ?? null;
        $status = $data['status'] ?? null;
    
        if (!$coach_id || !$sport_id || !$session_date || !$session_time || !$duration || !$status) {
            http_response_code(400);
            echo json_encode(["error" => "Missing fields or sports"]);
            exit;
        }

        $newSeance = Seance::create($conn, $coach_id, $sport_id, $session_date, $session_time, $duration, $status);

        if ($newSeance) {
            echo json_encode(["success" => true, "Session_id" => $newSeance]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Could not complete Coach"]);
        }
        exit;
    }
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
?>