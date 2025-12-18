<?php
    session_start();

    function auth() {
        if(!isset($_SESSION['user_id'])) {
            header("Location: /login");
            exit;
        }
    }
?>