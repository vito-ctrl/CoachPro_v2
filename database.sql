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