<?php
    class Sprorts {
        public static function getSports($conn){
            $stmt = $conn->prepare("SELECT * FROM sports");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>