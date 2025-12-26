<?php
class CompleteCoach {
    public static function create($conn, $user_id, $bio, $experience_years, $phone, $photo, $sports_ids){
        try{
            $conn->beginTransaction();

            $stmt = $conn->prepare(
                "INSERT INTO coach_profiles (user_id, bio, experience_years, phone, photo) 
                 VALUES (:user_id, :bio, :experience_years, :phone, :photo)"
            );
            
            $stmt->execute([
                ':user_id' => $user_id,
                ':bio' => $bio,
                ':experience_years' => $experience_years,
                ':phone' => $phone,
                ':photo' => $photo
            ]);

            // $coach_id = $conn->lastInsertId();

            $stmtSport = $conn->prepare(
                "INSERT INTO coach_sports (user_id, sport_id) VALUES (:user_id, :sport_id)"
            );

            foreach($sports_ids as $sport_id){
                $stmtSport->execute([
                    ':user_id' => $user_id,
                    ':sport_id' => (int)$sport_id
                ]);
            }

            $conn->commit();
            return $user_id; 
        } catch (PDOException $e) {
            $conn->rollBack();
            error_log($e->getMessage());
            echo json_encode([
                "sql_error" => $e->getMessage()
            ]);
            exit;
        }

    }

    public static function getAll($conn){
        $stmt = $conn->prepare("SELECT * FROM coach_profiles");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    
}
?>
