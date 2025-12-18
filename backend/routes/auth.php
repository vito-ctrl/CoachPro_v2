<?php
    require '../controllers/AuthController.php';
    require '../middlewares/auth.php';

    if($_SERVER['REQUEST_URI'] === '/dashboard') {
        auth();
        dashboard();
    }

    if ($_SERVER['REQUEST_URI'] === '/register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        register();
    }
?>