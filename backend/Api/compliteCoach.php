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
    require_once __DIR__ . '/../models/compliteCoach.php';

    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET'){
        $coach = compliteCoach::getAll($conn);
        echo json_encode($coach);
        exit;
    }

    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $user_id = $data['user_id'] ?? null;
        $bio = $data['bio'] ?? null;
        $experience = $data['experience'] ?? null;
        $phone = $data['phone'] ?? null;
        $photo = $data['photo'] ?? null;

        if (!$user_id || !$bio || !$experience || !$phone || !$photo) {
            http_response_code(400);
            echo json_encode(["error" => "Missing fields"]);
            exit;
        }

        if (compliteCoach::complite($user_id, $bio, $experience, $phone, $photo)) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Could not complete Coach"]);
        }
        exit;
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
?>