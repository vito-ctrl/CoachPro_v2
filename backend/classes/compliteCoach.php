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

            $coach_id = $conn->lastInsertId();

            $stmtSport = $conn->prepare(
                "INSERT INTO coach_sports (coach_id, sport_id) VALUES (:coach_id, :sport_id)"
            );

            foreach($sports_ids as $sport_id){
                $stmtSport->execute([
                    ':coach_id' => $coach_id,
                    ':sport_id' => $sport_id
                ]);
            }

            $conn->commit();
            return $coach_id; 
        } catch (PDOException $e) {
            $conn->rollBack();
            return false;
        }
    }

    public static function getAll($conn){
        $stmt = $conn->prepare("SELECT * FROM coach_profiles");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    
}
?>
