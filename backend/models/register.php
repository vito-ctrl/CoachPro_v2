<?php
class Register {
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
}
?>