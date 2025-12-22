CREATE DATABASE coachPro;

USE coachpro;

CREATE TABLE users (
    id int AUTO_INCREMENT PRIMARY key,
    username varchar(50) not null,
    email varchar(60) not null UNIQUE,
    password varchar(255) not null,
    role ENUM('atlethe','coach') not null
);

create TABLE coach_profiles (
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int not null,
    description text, 
    experience_years int not null,
    certifications varchar(255) DEFAULT null,
    photo text NOT null,
    FOREIGN key(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE sports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sport_name VARCHAR(50) NOT NULL
);

CREATE table coach_sports(
    id int AUTO_INCREMENT PRIMARY KEY,
    coach_profile_id int not null,
    sport_id int not null,
    FOREIGN key(coach_profile_id) REFERENCES coach_profiles(id),
    FOREIGN key(sport_id) REFERENCES sports(id)
);

CREATE TABLE availabilities (
    id int AUTO_INCREMENT PRIMARY KEY,
    coach_id int not null,
    date_avb date not null,
    start_time time not null,
    end_time time not null,
    status ENUM('available','booked') DEFAULT 'available',
    FOREIGN key(coach_id) REFERENCES coach_profiles(id) on DELETE CASCADE
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    athlete_id INT NOT NULL,
    coach_id INT NOT NULL,
    availability_id INT NOT NULL,
    status ENUM('pending','accepted','rejected','canceled') DEFAULT 'pending',
    FOREIGN KEY(athlete_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(coach_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(availability_id) REFERENCES availabilities(id) ON DELETE CASCADE
);



-- //////////////////////////////////////

CREATE DATABASE coachpro ;
USE coachpro;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('atlethe','coach') NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
 
);


CREATE TABLE coachProfile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    bio TEXT,
    experience INT,
    phone VARCHAR(20),
    photo VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);


CREATE TABLE coach_certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coach_id INT NOT NULL,
    certification_id INT NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE
);



CREATE TABLE availabilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coach_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE sports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE coach_sports (
	id INT AUTO_INCREMENT PRIMARY KEY,
    coach_id INT NOT NULL,
    sport_id INT NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);


CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sportif_id INT NOT NULL,
    coach_id INT NOT NULL,
    sport_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    status ENUM('pending','accepted','refused','cancelled') DEFAULT 'pending',
    FOREIGN KEY (sportif_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);


CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL UNIQUE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);


-- USERS
INSERT INTO users (role, name, email, password) VALUES
('client','Alice','alice@example.com','password1'),
('client','Bob','bob@example.com','password2'),
('client','Charlie','charlie@example.com','password3'),
('coach','David','david@example.com','password4'),
('coach','Emma','emma@example.com','password5'),
('coach','Frank','frank@example.com','password6'),
('coach','Grace','grace@example.com','password7');

-- COACH PROFILE
INSERT INTO coachProfile (user_id, bio, experience, phone, photo) VALUES
(4,'Expert in football coaching',5,'0600000001','david.jpg'),
(5,'Tennis professional coach',7,'0600000002','emma.jpg'),
(6,'Swimming coach with national medals',10,'0600000003','frank.jpg'),
(7,'Fitness and martial arts specialist',8,'0600000004','grace.jpg'),
(4,'Football strategy coach',6,'0600000005','david2.jpg'),
(5,'Tennis fitness coach',3,'0600000006','emma2.jpg'),
(6,'Swimming technique trainer',4,'0600000007','frank2.jpg');

-- CERTIFICATIONS
INSERT INTO certifications (name) VALUES
('FIFA Coaching License'),
('Tennis Pro Certification'),
('Swimming National Coach'),
('Personal Trainer Certification'),
('Martial Arts Black Belt'),
('Nutrition and Fitness'),
('First Aid Certification');

-- COACH_CERTIFICATIONS
INSERT INTO coach_certifications (coach_id, certification_id) VALUES
(4,1),
(4,4),
(5,2),
(5,6),
(6,3),
(6,7),
(7,5);

-- AVAILABILITIES
INSERT INTO availabilities (coach_id, date, start_time, end_time) VALUES
(4,'2025-12-20','09:00:00','11:00:00'),
(5,'2025-12-20','10:00:00','12:00:00'),
(6,'2025-12-21','08:00:00','10:00:00'),
(7,'2025-12-21','14:00:00','16:00:00'),
(4,'2025-12-22','15:00:00','17:00:00'),
(5,'2025-12-22','09:00:00','11:00:00'),
(6,'2025-12-23','10:00:00','12:00:00');

-- SPORTS
INSERT INTO sports (name) VALUES
('Football'),
('Tennis'),
('Swimming'),
('Athletics'),
('Martial Arts'),
('Gymnastics'),
('Cycling');

-- COACH_SPORTS
INSERT INTO coach_sports (coach_id, sport_id) VALUES
(4,1),
(5,2),
(6,3),
(7,5),
(4,4),
(5,6),
(6,7);

-- BOOKINGS
INSERT INTO bookings (sportif_id, coach_id, sport_id, date, start_time, status) VALUES
(1,4,1,'2025-12-20','09:00:00','pending'),
(2,5,2,'2025-12-20','10:00:00','accepted'),
(3,6,3,'2025-12-21','08:00:00','refused'),
(1,7,5,'2025-12-21','14:00:00','cancelled'),
(2,4,4,'2025-12-22','15:00:00','pending'),
(3,5,6,'2025-12-22','09:00:00','accepted'),
(1,6,7,'2025-12-23','10:00:00','pending');

-- REVIEWS
INSERT INTO reviews (booking_id, rating, comment) VALUES
(2,5,'Excellent coaching session!'),
(6,4,'Good session, but could improve timing.'),
(1,5,'Very professional.'),
(3,3,'Average experience.'),
(4,2,'Not satisfied.'),
(5,4,'Great coaching.'),
(7,5,'Highly recommended!');
