<?php
    class Login {
        public static function findByEmail($conn, $email) {
            $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
            $stmt->execute([
                ':email' => $email
            ]);

            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }
?>