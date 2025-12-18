<?php
require './config/db.php';
require './models/User.php';

$name = "l9irch";
$email = "test9irch@mail.com";
$password = password_hash("123456", PASSWORD_DEFAULT);

$result = User::create($conn, $name, $email, $password);

if ($result) {
    echo "✅ User created successfully";
} else {
    echo "❌ Failed to create user";
}
?>