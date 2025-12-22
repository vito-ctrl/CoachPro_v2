<?php
    class compliteCoach {
        public static function complite($user_id ,$bio, $experience, $phone, $photo){
            global $conn;
            $stmt = $conn->prepare(
                "INSERT INTO coachProfile (user_id, bio, experience, phone, photo) VALUES (?, ?, ?, ?, ?)"
            );
            $stmt->bind_param("isiss", $user_id, $bio, $experience, $phone, $photo);
            return $stmt->execute();
        }

        public static function getAll($conn){
            $stmt = $conn->query("SELECT user_id FROM coachProfile");
            return $stmt->fetch_all(MYSQLI_ASSOC);
        }
    }
?>