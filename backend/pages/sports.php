<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if($_SERVER['REQUEST_METHOD'] === 'OPTION') {
        http_response_code(200);
        exit;
    }

    require_once __DIR__ . '/../config/db.php';
    require_once __DIR__ . '/../classes/sports.php';
    
    $database = new database();
    $conn = $database->connect();

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $sport = Sprorts::getSports($conn);
        echo json_encode($sport);
        exit;
    }
?>