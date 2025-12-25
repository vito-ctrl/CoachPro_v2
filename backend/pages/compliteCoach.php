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
    require_once __DIR__ . '/../classes/compliteCoach.php';

    $database = new Database();
    $conn = $database->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET'){
        $coach = CompleteCoach::getAll($conn);
        echo json_encode($coach);
        exit;
    }

    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $user_id     = $data['user_id'] ?? null;
        $bio         = $data['bio'] ?? null;
        $experience_years  = $data['experience_years'] ?? null;
        $phone       = $data['phone'] ?? null;
        $photo       = $data['photo'] ?? null;
        $sports_ids  = $data['sports_ids'] ?? [];

        if (!$user_id || !$bio || !$experience_years || !$phone || !$photo || empty($sports_ids)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing fields or sports"]);
            exit;
        }

        $newCoachId = CompleteCoach::create($conn, $user_id, $bio, $experience_years, $phone, $photo, $sports_ids);

        if ($newCoachId) {
            echo json_encode(["success" => true, "coach_id" => $newCoachId]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Could not complete Coach"]);
        }
        exit;
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
?>