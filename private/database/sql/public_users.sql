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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idusers` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `permission` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 normal\n\n1 other \n\n2 admin',
  `token` varchar(200) NOT NULL,
  `avatar` int(11) NOT NULL DEFAULT '0',
  `banned` int(11) DEFAULT '0' COMMENT 'banned=1\nnot banned=0',
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='table for storing user information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (22,'francisco123222@altran.pt','Francisco','$2a$10$Iua2WqU9CtGnJRyw/OzULuhRplmWkSxGsW..u3OIKB5vq3ByIFcuO','2','5ac70c58102a4f18e0a3d0ad2a0e6a3cc0e6f817',0,0),(23,'antonio@altran.pt','Antonio','$2a$10$Iua2WqU9CtGnJRyw/OzULuhRplmWkSxGsW..u3OIKB5vq3ByIFcuO','1','9482541cec29fbabdc695b59068f234f6059f8a4',0,0),(24,'sand123123ro@altran.pt','Sandro','$2a$10$WKhvUC8FNVlm26wOUeaNsOoWLfPRIi97RZjD5uftz3nRUSj.pKGGm','0','fb192f0d0d749b8aef89e6b5dc48715d99a4a23f',0,0);
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

-- Dump completed on 2016-06-03  2:52:15
