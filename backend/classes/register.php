<?php
    class Register {
        public static function create($conn, $first_name, $last_name, $email, $password, $role) {
            $check = $conn->prepare("SELECT id FROM users WHERE email = :email");
            $check->execute([':email' => $email]);
            if($check->rowCount() > 0){
                return false;
            }

            $stmt = $conn->prepare(
                "INSERT INTO users (first_name, last_name, email, password, role)
                VALUES (:first_name, :last_name, :email, :password, :role)"
            );
           
            return $stmt->execute([
                ':first_name' => $first_name,
                ':last_name' => $last_name,
                ':email' => $email,
                ':password' => $password,
                ':role' => $role
            ]);
        }

        public static function getAll($conn) {
            $stmt = $conn->prepare("SELECT id, first_name, email, role FROM users");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>