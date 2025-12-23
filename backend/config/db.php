<?php
$host = "localhost";
$username = "vito";
$password = "vito123456789";
$dbname = "coachPro";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
