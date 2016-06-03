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
  PRIMARY KEY (`idproject`),
  KEY `idUsers_idx` (`manager`),
  KEY `idsector_idx` (`sector`),
  CONSTRAINT `idUsers` FOREIGN KEY (`manager`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idsector` FOREIGN KEY (`sector`) REFERENCES `business_sectors` (`idSector`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (4,'ADM3','asdasdas',22,'2016-05-23','2016-05-26','2016-05-31','asdsdas',12,12,'asdasdas',6),(5,'ADM1','sdasdsadasdsa',22,'2016-05-30','2016-06-01','2016-06-04','dasdsadsadsa',12,12,'sadsadsadas',6),(6,'ADM3','Projeto7',22,'2016-05-23','2016-05-30','2016-06-03','Entrega7',12,5,'Cliente7',2),(7,'ADM2','P7',22,'2016-05-24','2016-05-31','2016-06-04','M7',12,3,'C7',2),(8,'ADM1','Projeto Teste Final',23,'2016-05-01','2016-05-01','2016-05-17','Presencial',31,16,'Cliente Teste Final',1);
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

-- Dump completed on 2016-06-03 15:24:41
