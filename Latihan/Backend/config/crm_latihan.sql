-- MySQL dump 10.13  Distrib 9.5.0, for macos26.1 (arm64)
--
-- Host: localhost    Database: crm_latihan
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP DATABASE IF EXISTS crm_latihan;
CREATE DATABASE crm_latihan;
USE crm_latihan;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `type` enum('Call','Email','Meeting','Note') DEFAULT NULL,
  `description` text,
  `activity_date` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `activities_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,1,'Call','Tanya kebutuhan IT','2026-06-14 09:00:00',2),(2,2,'Meeting','Presentasi branding','2026-06-14 10:00:00',2),(3,3,'Email','Kirim penawaran','2026-06-14 11:00:00',3),(4,4,'Note','Belum bisa dihubungi','2026-06-14 12:00:00',3),(5,5,'Meeting','Diskusi teknis server','2026-06-14 13:00:00',4),(6,6,'Call','Follow up audit','2026-06-14 14:00:00',4),(7,7,'Email','Kirim demo POS','2026-06-14 15:00:00',8),(8,8,'Meeting','Kunjungan proyek','2026-06-14 16:00:00',8),(9,9,'Call','Konfirmasi fitur','2026-06-14 17:00:00',10),(10,10,'Note','Menunggu persetujuan','2026-06-14 18:00:00',10);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,1,'Budi','budi@majujaya.com','081111111','Manager','2026-06-14 04:07:47'),(2,2,'Siti','siti@kreatif.com','081222222','Direktur','2026-06-14 04:07:47'),(3,3,'Andi','andi@sukses.com','081333333','Staff','2026-06-14 04:07:47'),(4,4,'Dedi','dedi@dagang.com','081444444','Owner','2026-06-14 04:07:47'),(5,5,'Eka','eka@tech.com','081555555','CTO','2026-06-14 04:07:47'),(6,6,'Fani','fani@law.com','081666666','Legal','2026-06-14 04:07:47'),(7,7,'Gani','gani@resto.com','081777777','Manager','2026-06-14 04:07:47'),(8,8,'Hani','hani@tb.com','081888888','Owner','2026-06-14 04:07:47'),(9,9,'Indah','indah@sekolah.com','081999999','Kepala Sekolah','2026-06-14 04:07:47'),(10,10,'Joko','joko@hotel.com','082000000','General Manager','2026-06-14 04:07:47');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'PT Maju Jaya','info@majujaya.com','081111111','Maju Jaya','Active',2,'2026-06-14 04:07:44'),(2,'CV Kreatif','hello@kreatif.com','081222222','Kreatif','Active',2,'2026-06-14 04:07:44'),(3,'PT Sukses','kontak@sukses.com','081333333','Sukses','Active',3,'2026-06-14 04:07:44'),(4,'UD Dagang','sales@dagang.com','081444444','Dagang','Lead',3,'2026-06-14 04:07:44'),(5,'Startup Tech','hi@tech.com','081555555','Startup','Active',4,'2026-06-14 04:07:44'),(6,'Firma Hukum','law@firm.com','081666666','Law Firm','Prospect',4,'2026-06-14 04:07:44'),(7,'Resto Enak','makan@resto.com','081777777','Resto','Active',8,'2026-06-14 04:07:44'),(8,'Toko Bangunan','bahan@bangunan.com','081888888','TB Jaya','Lead',8,'2026-06-14 04:07:44'),(9,'Sekolah Maju','info@sekolah.com','081999999','Sekolah','Active',10,'2026-06-14 04:07:44'),(10,'Hotel Nyaman','booking@hotel.com','082000000','Hotel','Lead',10,'2026-06-14 04:07:44');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lead_id` int NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `stage` enum('Proposal','Negotiation','Won','Lost') DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `lead_id` (`lead_id`),
  CONSTRAINT `deals_ibfk_1` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (1,1,'IT System Project',50000000.00,'Proposal',NULL,'2026-06-14 04:07:54'),(2,2,'Logo Branding',5000000.00,'Negotiation',NULL,'2026-06-14 04:07:54'),(3,3,'Lisensi Software',15000000.00,'Won','2026-06-01 10:00:00','2026-06-14 04:07:54'),(4,4,'Supply Kontrak',20000000.00,'Proposal',NULL,'2026-06-14 04:07:54'),(5,5,'Server Upgrade',75000000.00,'Negotiation',NULL,'2026-06-14 04:07:54'),(6,6,'Audit Hukum',10000000.00,'Won','2026-06-10 14:00:00','2026-06-14 04:07:54'),(7,7,'POS System',12000000.00,'Proposal',NULL,'2026-06-14 04:07:54'),(8,8,'Material Beton',100000000.00,'Negotiation',NULL,'2026-06-14 04:07:54'),(9,9,'Akademik App',30000000.00,'Proposal',NULL,'2026-06-14 04:07:54'),(10,10,'Booking App',25000000.00,'Negotiation',NULL,'2026-06-14 04:07:54');
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `notes` text,
  `status` enum('New','Contacted','Qualified','Lost') DEFAULT 'New',
  `assigned_to` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leads_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` VALUES (1,1,'Proyek IT','Website','Butuh sistem baru','New',2,'2026-06-14 04:07:51'),(2,2,'Branding','Referral','Perlu logo','Contacted',2,'2026-06-14 04:07:51'),(3,3,'Pembelian Software','Ads','Beli lisensi','Qualified',3,'2026-06-14 04:07:51'),(4,4,'Supply Barang','Cold Call','Cari suplier','New',3,'2026-06-14 04:07:51'),(5,5,'Cloud Server','LinkedIn','Upgrade server','Qualified',4,'2026-06-14 04:07:51'),(6,6,'Legal Audit','Networking','Audit tahunan','Contacted',4,'2026-06-14 04:07:51'),(7,7,'Sistem POS','Email','Butuh kasir','New',8,'2026-06-14 04:07:51'),(8,8,'Material Bangunan','Offline','Proyek perumahan','Qualified',8,'2026-06-14 04:07:51'),(9,9,'Sistem Akademik','Website','Input nilai','New',10,'2026-06-14 04:07:51'),(10,10,'Booking System','Referral','Butuh sistem kamar','Qualified',10,'2026-06-14 04:07:51');
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff','sales') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Utama','admin@mail.com','hashed_pass','admin','2026-06-14 04:07:41'),(2,'Sales 1','sales1@mail.com','hashed_pass','sales','2026-06-14 04:07:41'),(3,'Sales 2','sales2@mail.com','hashed_pass','sales','2026-06-14 04:07:41'),(4,'Sales 3','sales3@mail.com','hashed_pass','sales','2026-06-14 04:07:41'),(5,'Staff A','staff1@mail.com','hashed_pass','staff','2026-06-14 04:07:41'),(6,'Staff B','staff2@mail.com','hashed_pass','staff','2026-06-14 04:07:41'),(7,'Manager 1','mgr1@mail.com','hashed_pass','admin','2026-06-14 04:07:41'),(8,'Sales 4','sales4@mail.com','hashed_pass','sales','2026-06-14 04:07:41'),(9,'Staff C','staff3@mail.com','hashed_pass','staff','2026-06-14 04:07:41'),(10,'Sales 5','sales5@mail.com','hashed_pass','sales','2026-06-14 04:07:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-14 11:25:51
