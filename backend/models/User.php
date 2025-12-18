<?php
class User {
    public static function create($conn, $name, $email, $password, $role) {
        $stmt = $conn->prepare(
            "INSERT INTO users (name, email, password, role)
             VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param("ssss", $name, $email, $password, $role);
        return $stmt->execute();
    }

    public static function getAll($conn) {
        $result = $conn->query("SELECT id, name, email, role FROM users");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function findByEmail($conn, $email) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
    }
}
?>