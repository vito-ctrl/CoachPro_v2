<?php 
    $host = "localhost";
    $dbuser = "vito";
    $password = "vito123456789";
    $dbname = "coachPro";
    $conn = new mysqli($host, $dbuser, $password, $dbname);
    if($conn->connect_error){
        die("connection to db failed");
    }
?>