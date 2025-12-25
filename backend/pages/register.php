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
    require_once __DIR__ . '/../classes/register.php';

    $database = new Database();
    $conn = $database->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $users = Register::getAll($conn);
        echo json_encode($users);
        exit;
    }

    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $first_name = $data['first_name'] ?? null;
        $last_name = $data['last_name'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $role = $data['role'] ?? null;

        if (!$first_name || !$last_name || !$email || !$password || !$role) {
            http_response_code(400);
            echo json_encode(["error" => "Missing fields"]);
            exit;
        }

        $hashed = password_hash($password, PASSWORD_DEFAULT);

        if (Register::create($conn, $first_name, $last_name, $email, $hashed, $role)) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Could not create user"]);
        }
        exit;
    }

    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
?>