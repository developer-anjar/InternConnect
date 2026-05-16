-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: internconnect
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `internship_application`
--

DROP TABLE IF EXISTS `internship_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internship_application` (
  `application_id` bigint NOT NULL AUTO_INCREMENT,
  `applied_at` datetime(6) DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  `internship_id` bigint DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `internship_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  UNIQUE KEY `UKmloa20fmjef7xanwkh5tcw3hx` (`internship_id`,`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internship_application`
--

LOCK TABLES `internship_application` WRITE;
/*!40000 ALTER TABLE `internship_application` DISABLE KEYS */;
INSERT INTO `internship_application` VALUES (1,'2026-03-13 23:43:50.052170',1,1,1,'APPROVED','TCS','Web Developer Intern'),(2,'2026-03-14 09:31:44.671326',1,1,2,'APPROVED','TCS','Web Developer Intern'),(3,'2026-03-14 12:10:56.610112',2,2,2,'PENDING','Dezykode IT Solutions','Frontend Developer'),(4,'2026-04-05 13:39:50.313636',2,2,1,'PENDING','Dezykode IT Solutions','Frontend Developer');
/*!40000 ALTER TABLE `internship_application` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-17  0:42:40
