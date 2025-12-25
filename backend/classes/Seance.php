<?php
    class Seance {
        public static function create($conn, $coach_id, $sport_id, $session_date, $session_time, $duration, $status){
            $stmt = $conn->prepare(
                "INSERT INTO sessions (coach_id, sport_id, session_date, session_time, duration, status)
                VALUES (:coach_id, :sport_id, :session_date, :session_time, :duration, :status)"
            );

            $success = $stmt->execute([
                ':coach_id' => $coach_id,
                ':sport_id' => $sport_id,
                ':session_date' => $session_date,
                ':session_time' => $session_time,
                ':duration' => $duration,
                ':status' => $status
            ]);

            if ($success) {
                return $conn->lastInsertId();
            }

            return false;
        }

        public static function getAll($conn){
            $stmt = $conn->prepare("SELECT * FROM sessions");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>