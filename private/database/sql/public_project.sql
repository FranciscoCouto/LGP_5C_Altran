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
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `idproject` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `manager` int(11) NOT NULL,
  `dateBeginning` date NOT NULL,
  `dateEndExpected` date DEFAULT NULL,
  `dateEnd` date DEFAULT NULL,
  `deliveringModel` varchar(45) NOT NULL,
  `numberConsultants` int(11) NOT NULL,
  `daysDuration` int(11) DEFAULT NULL,
  `client` varchar(45) NOT NULL,
  `sector` int(11) NOT NULL,
  `finish` int(11) DEFAULT '1',
  `budget` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idproject`),
  KEY `idUsers_idx` (`manager`),
  KEY `idsector_idx` (`sector`),
  CONSTRAINT `idUsers` FOREIGN KEY (`manager`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idsector` FOREIGN KEY (`sector`) REFERENCES `business_sectors` (`idSector`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'ADM4','Projeto',5,'2016-06-09','2013-12-10','2017-02-01','Presencial',12,400,'FEUP',2,1,0),(2,'ADM2','Projeto2',2,'2016-06-21','2016-06-24','2016-06-25','Online',13,10,'AAS',2,1,0),(3,'ADM3','Projeto3',2,'2016-06-23','2016-07-02','2016-07-03','Online',412,12,'Quim',6,0,0),(4,'ADM2','O tal Projeto',2,'2016-05-29','2016-06-04','2016-06-01','Online',34,32,'Google',2,1,0),(5,'ADM1','Projeto Muito Caro',2,'2016-06-02','2016-06-06','2016-06-22','Online',14,35,'FarFetch',1,1,12365478);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-30 13:56:31
