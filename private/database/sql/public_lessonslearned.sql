-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: public
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lessonslearned`
--
USE public;
DROP TABLE IF EXISTS `lessonslearned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lessonslearned` (
  `idLessonsLearned` int(11) NOT NULL AUTO_INCREMENT,
  `manager` int(11) NOT NULL,
  `project` int(11) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `creationdate` date NOT NULL,
  `aproveddate` date DEFAULT NULL,
  `approver` int(11) DEFAULT NULL,
  `feedback` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idLessonsLearned`),
  KEY `idUser_idx` (`manager`),
  KEY `idProject_idx` (`project`),
  KEY `idApprover_idx` (`approver`),
  CONSTRAINT `idApprover` FOREIGN KEY (`approver`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idManager` FOREIGN KEY (`manager`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `idProject` FOREIGN KEY (`project`) REFERENCES `project` (`idproject`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessonslearned`
--

LOCK TABLES `lessonslearned` WRITE;
/*!40000 ALTER TABLE `lessonslearned` DISABLE KEYS */;
INSERT INTO `lessonslearned` VALUES (1,22,4,'approved','2016-05-22',NULL,22,'Olha que parvo que fostes!'),(2,22,NULL,'approved','2016-05-24',NULL,22,'Wooops'),(3,22,4,'approved','2016-05-26',NULL,22,'Upas Upas');
/*!40000 ALTER TABLE `lessonslearned` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-28  3:18:16