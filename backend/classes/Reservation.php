<?php
    class Bookings {
        public static function create($conn, $session_id, $user_id){
            $stmt = $conn->prepare("INSERT INTO bookings (session_id, user_id) 
            VALUES (:session_id, :user_id)");

            $success = $stmt->execute([
                ':session_id' => $session_id,
                ':user_id' => $user_id
            ]);

            if ($success) {
                return $conn->lastInsertId();
            }

            return false;
        }

        public static function getAll($conn){
            $stmt = $conn->prepare("SELECT * FROM bookings");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }