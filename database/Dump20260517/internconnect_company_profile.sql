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
-- Table structure for table `company_profile`
--

DROP TABLE IF EXISTS `company_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_profile` (
  `company_id` bigint NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_size` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `established_year` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_profile`
--

LOCK TABLES `company_profile` WRITE;
/*!40000 ALTER TABLE `company_profile` DISABLE KEYS */;
INSERT INTO `company_profile` VALUES (1,'TCS','500+','We work for Profession\n','tcs@gmail.com','1980','Pune','9876543210'),(2,'Dezykode IT Solutions','11-50','','dezykode@gmail.com','2011','Kharadi','9876543210'),(3,'TechNova Solutions','51-200','TechNova Solutions is a fast-growing software company specializing in web development, cloud computing, and scalable enterprise applications. It works with startups and enterprises to build modern digital products.','hr@technova.com','2018','Pune','1234567890'),(4,'CodeCraft Pvt Ltd','11-50','Web development and UI solutions company.','hr@codecraft.com','2017','Mumbai','9876543201'),(5,'DataMind AI','100-300','AI and data science solutions for enterprises.','hr@datamind.ai','2019','Bangalore','9876543202'),(6,'CloudNest Technologies','50-200','Cloud computing and DevOps services provider.','hr@cloudnest.com','2016','Hyderabad','9876543203'),(7,'SecureNet Cybersecurity','20-100','Cybersecurity and ethical hacking services.','hr@securenet.com','2018','Delhi','9876543204'),(8,'Appify Solutions','50-150','Mobile app development company.','hr@appify.com','2020','Chennai','9876543205'),(9,'FinEdge Analytics','100-250','Fintech and analytics company.','hr@finedge.com','2015','Bangalore','9876543206'),(10,'DesignHive Studio','10-50','Creative UI/UX and graphic design agency.','hr@designhive.com','2021','Pune','9876543207'),(11,'MarketGenius','50-200','Digital marketing and branding solutions.','hr@marketgenius.com','2016','Mumbai','9876543208'),(12,'EduSmart Technologies','100-300','EdTech platform for online learning.','hr@edusmart.com','2017','Noida','9876543209'),(13,'HealthTech Labs','50-150','Healthcare technology and AI solutions.','hr@healthtech.com','2019','Bangalore','9876543210'),(14,'GameForge Studio','20-100','Game development and 3D design studio.','hr@gameforge.com','2020','Hyderabad','9876543211'),(15,'NextGen Software','100-300','Enterprise software development company.','hr@nextgen.com','2014','Pune','9876543212'),(16,'Innovatech Systems','50-200','Innovation-driven IT solutions provider.','hr@innovatech.com','2018','Chennai','9876543213'),(17,'BrightCode Labs','20-100','Startup focused development company.','hr@brightcode.com','2021','Bangalore','9876543214'),(18,'LogicWorks','50-150','Software consulting and development firm.','hr@logicworks.com','2015','Delhi','9876543215');
/*!40000 ALTER TABLE `company_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-17  0:42:39
