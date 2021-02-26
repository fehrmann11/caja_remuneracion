-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `carga`
--

DROP TABLE IF EXISTS `carga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carga` (
  `rut_carga` varchar(13) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `tipo_carga` char(1) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) DEFAULT NULL,
  `trabajador_rut_trabajador` varchar(13) NOT NULL,
  PRIMARY KEY (`rut_carga`),
  KEY `fk_carga_trabajador1_idx` (`trabajador_rut_trabajador`),
  CONSTRAINT `fk_carga_trabajador1` FOREIGN KEY (`trabajador_rut_trabajador`) REFERENCES `trabajador` (`rut_trabajador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carga`
--

LOCK TABLES `carga` WRITE;
/*!40000 ALTER TABLE `carga` DISABLE KEYS */;
INSERT INTO `carga` VALUES ('12322212','Gonzalo Fernando','2','Fehrmann','Cárcamo','131174861'),('123456789','Ian Martín','1','Fehrmann','Cárcamo','124316170'),('1333456789','Heber Fernando','1','Fehrmann','Cárcamo','124316170');
/*!40000 ALTER TABLE `carga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleador`
--

DROP TABLE IF EXISTS `empleador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleador` (
  `rut_empleador` varchar(13) NOT NULL,
  `razon_social` varchar(128) NOT NULL,
  `telefono_fijo` varchar(10) NOT NULL,
  `telefono_celular` varchar(10) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `direccion` varchar(225) DEFAULT NULL,
  `tipo_empleador` char(1) NOT NULL,
  PRIMARY KEY (`rut_empleador`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleador`
--

LOCK TABLES `empleador` WRITE;
/*!40000 ALTER TABLE `empleador` DISABLE KEYS */;
INSERT INTO `empleador` VALUES ('188881025','Henry LTDA','12331','2323','henry.fehrmann@alumnos.uach.cl','holand','1'),('194427220','UNAPRUEBA','121212','2313213','henryfc7@gmail.com','holanda 222','2');
/*!40000 ALTER TABLE `empleador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleador_has_trabajador`
--

DROP TABLE IF EXISTS `empleador_has_trabajador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleador_has_trabajador` (
  `empleador_rut_empleador` varchar(13) NOT NULL,
  `trabajador_rut_trabajador` varchar(13) NOT NULL,
  PRIMARY KEY (`empleador_rut_empleador`,`trabajador_rut_trabajador`),
  KEY `fk_empleador_has_trabajador_trabajador1_idx` (`trabajador_rut_trabajador`),
  KEY `fk_empleador_has_trabajador_empleador1_idx` (`empleador_rut_empleador`),
  CONSTRAINT `fk_empleador_has_trabajador_empleador1` FOREIGN KEY (`empleador_rut_empleador`) REFERENCES `empleador` (`rut_empleador`),
  CONSTRAINT `fk_empleador_has_trabajador_trabajador1` FOREIGN KEY (`trabajador_rut_trabajador`) REFERENCES `trabajador` (`rut_trabajador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleador_has_trabajador`
--

LOCK TABLES `empleador_has_trabajador` WRITE;
/*!40000 ALTER TABLE `empleador_has_trabajador` DISABLE KEYS */;
INSERT INTO `empleador_has_trabajador` VALUES ('188881025','124316170'),('188881025','131174861');
/*!40000 ALTER TABLE `empleador_has_trabajador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `idlog` int NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `usuario_idusuario` int NOT NULL,
  PRIMARY KEY (`idlog`),
  KEY `fk_log_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_log_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodo`
--

DROP TABLE IF EXISTS `periodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodo` (
  `idperiodo` int NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`idperiodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodo`
--

LOCK TABLES `periodo` WRITE;
/*!40000 ALTER TABLE `periodo` DISABLE KEYS */;
INSERT INTO `periodo` VALUES (1,'2021-01-01','2021-01-31','Enero 2021'),(2,'2021-02-01','2021-02-28','Febrero 2021');
/*!40000 ALTER TABLE `periodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remuneracion`
--

DROP TABLE IF EXISTS `remuneracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remuneracion` (
  `carga_rut_carga` varchar(13) NOT NULL,
  `trabajador_rut_trabajador` varchar(13) NOT NULL,
  `periodo_idperiodo` int NOT NULL,
  `monto` decimal(19,4) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `empleador_rut_empleador` varchar(13) NOT NULL,
  PRIMARY KEY (`carga_rut_carga`,`trabajador_rut_trabajador`,`periodo_idperiodo`,`empleador_rut_empleador`),
  KEY `fk_remuneracion_carga1_idx` (`carga_rut_carga`),
  KEY `fk_remuneracion_trabajador1_idx` (`trabajador_rut_trabajador`),
  KEY `fk_remuneracion_periodo1_idx` (`periodo_idperiodo`),
  KEY `fk_remuneracion_empleador1_idx` (`empleador_rut_empleador`),
  CONSTRAINT `fk_remuneracion_carga1` FOREIGN KEY (`carga_rut_carga`) REFERENCES `carga` (`rut_carga`),
  CONSTRAINT `fk_remuneracion_empleador1` FOREIGN KEY (`empleador_rut_empleador`) REFERENCES `empleador` (`rut_empleador`),
  CONSTRAINT `fk_remuneracion_periodo1` FOREIGN KEY (`periodo_idperiodo`) REFERENCES `periodo` (`idperiodo`),
  CONSTRAINT `fk_remuneracion_trabajador1` FOREIGN KEY (`trabajador_rut_trabajador`) REFERENCES `trabajador` (`rut_trabajador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remuneracion`
--

LOCK TABLES `remuneracion` WRITE;
/*!40000 ALTER TABLE `remuneracion` DISABLE KEYS */;
INSERT INTO `remuneracion` VALUES ('12322212','131174861',1,100000.0000,1,'188881025'),('12322212','131174861',2,10000.0000,1,'188881025'),('123456789','124316170',1,400.0000,0,'188881025'),('123456789','124316170 ',2,4000.0000,1,'188881025'),('1333456789','124316170',1,10.0000,0,'188881025');
/*!40000 ALTER TABLE `remuneracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `idreporte` int NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `usuario_idusuario` int NOT NULL,
  PRIMARY KEY (`idreporte`),
  KEY `fk_reporte_usuario_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_reporte_usuario` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte`
--

LOCK TABLES `reporte` WRITE;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idrol` int NOT NULL,
  `rol` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idrol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN'),(2,'BACKOFFICE'),(3,'NEGOCIO'),(4,'EXTERNO');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajador`
--

DROP TABLE IF EXISTS `trabajador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trabajador` (
  `rut_trabajador` varchar(13) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `telefono_fijo` varchar(10) DEFAULT NULL,
  `telefono_celular` varchar(10) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `direccion` varchar(225) DEFAULT NULL,
  `tramo` char(1) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`rut_trabajador`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajador`
--

LOCK TABLES `trabajador` WRITE;
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
INSERT INTO `trabajador` VALUES ('124316170','Marcia','123131','123123','marcia@gmail.com','pedrito ruiz','D','Cárcamo','Mancilla'),('131174861','Nelson','123131','123123','nelson@gmail.com','pedrito ruiz','B','Fehrmann','Cárcamo');
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL,
  `rut_usuario` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `rut_UNIQUE` (`rut_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'111111111','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK'),(2,'222222222','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK'),(3,'333333333','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK'),(4,'444444444','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_has_rol`
--

DROP TABLE IF EXISTS `usuario_has_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_has_rol` (
  `usuario_idusuario` int NOT NULL,
  `rol_idrol` int NOT NULL,
  PRIMARY KEY (`usuario_idusuario`,`rol_idrol`),
  KEY `fk_usuario_has_rol_rol1_idx` (`rol_idrol`),
  KEY `fk_usuario_has_rol_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_usuario_has_rol_rol1` FOREIGN KEY (`rol_idrol`) REFERENCES `rol` (`idrol`),
  CONSTRAINT `fk_usuario_has_rol_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_has_rol`
--

LOCK TABLES `usuario_has_rol` WRITE;
/*!40000 ALTER TABLE `usuario_has_rol` DISABLE KEYS */;
INSERT INTO `usuario_has_rol` VALUES (1,1),(2,2),(3,3),(4,4);
/*!40000 ALTER TABLE `usuario_has_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-26 15:00:21
