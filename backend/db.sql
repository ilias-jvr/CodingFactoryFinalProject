-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Generation Time: Dec 30, 2023 at 08:44 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

--
-- Database: `patiently`
--
CREATE DATABASE
    IF NOT EXISTS `patiently` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `patiently`;

-- --------------------------------------------------------

--
-- Table structure for table `Doctors`
--

CREATE TABLE
    `Doctors` (
        `doctor_id` int NOT NULL,
        `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `last_name` varchar(50) NOT NULL,
        `contact_number` varchar(20) DEFAULT NULL,
        `address` varchar(255) DEFAULT NULL,
        `password` varchar(255) NOT NULL,
        `email` varchar(100) DEFAULT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Doctors`
--

-- --------------------------------------------------------

--
-- Table structure for table `Patients`
--

CREATE TABLE
    `Patients` (
        `patient_id` int NOT NULL,
        `doctor_id` int DEFAULT NULL,
        `first_name` varchar(50) NOT NULL,
        `last_name` varchar(50) NOT NULL,
        `date_of_birth` date DEFAULT NULL,
        `contact_number` varchar(20) DEFAULT NULL,
        `email` varchar(100) DEFAULT NULL,
        `address` varchar(255) DEFAULT NULL,
        `medical_history` text
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Patients`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Doctors`
--
ALTER TABLE `Doctors` ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `Patients`
--
ALTER TABLE `Patients`
ADD
    PRIMARY KEY (`patient_id`),
ADD
    KEY `FK_1d39cba3ec062b5ea5f4bbe623b` (`doctor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Doctors`
--
ALTER TABLE
    `Doctors` MODIFY `doctor_id` int NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 14;

--
-- AUTO_INCREMENT for table `Patients`
--
ALTER TABLE
    `Patients` MODIFY `patient_id` int NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Patients`
--
ALTER TABLE `Patients`
ADD
    CONSTRAINT `FK_1d39cba3ec062b5ea5f4bbe623b` FOREIGN KEY (`doctor_id`) REFERENCES `Doctors` (`doctor_id`);

COMMIT;