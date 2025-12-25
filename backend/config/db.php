<?php
    class Database {
        private $host = "localhost";
        private $dbname = "CoachPro";
        private $username = "vito";
        private $password = "vito123456789";

        public function connect() {
            try {
                return new PDO(
                    "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4",
                    $this->username,
                    $this->password,
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                );
            } catch (PDOException $e) {
                die("DB Error: " . $e->getMessage());
            }
        }
    }
?>