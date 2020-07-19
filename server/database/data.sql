-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for map
CREATE DATABASE IF NOT EXISTS `map` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `map`;

-- Dumping structure for table map.adonis_schema
CREATE TABLE IF NOT EXISTS `adonis_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table map.adonis_schema: ~3 rows (approximately)
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
	(10, '1503248427885_user', 1, '2020-07-14 21:58:34'),
	(11, '1503248427886_token', 1, '2020-07-14 21:58:34'),
	(12, '1594733745020_routes_schema', 1, '2020-07-14 21:58:34');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;

-- Dumping structure for table map.routes
CREATE TABLE IF NOT EXISTS `routes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start` varchar(255) DEFAULT NULL,
  `end` varchar(255) DEFAULT NULL,
  `speed` varchar(255) DEFAULT NULL,
  `angle` varchar(255) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `begin_date` varchar(255) DEFAULT NULL,
  `begin_time` varchar(255) DEFAULT NULL,
  `finish_date` varchar(255) DEFAULT NULL,
  `finish_time` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table map.routes: ~4 rows (approximately)
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` (`id`, `start`, `end`, `speed`, `angle`, `distance`, `begin_date`, `begin_time`, `finish_date`, `finish_time`, `created_at`, `updated_at`) VALUES
(1, '40.44668578807542,49.97268676757813', '40.51562620688753,50.09353637695313', '300', '60.29677392345006', 12791, '2020-07-16', '03:00:00', '2020-07-16', '03:42:38', '2020-07-14 21:58:55', '2020-07-14 21:58:55'),
(2, '40.395718433470364,49.99534606933594', '40.42290582797254,50.021781921386726', '300', '44.19703870436891', 3766, '2020-07-16', '03:00:00', '2020-07-16', '03:12:33', '2020-07-14 21:58:55', '2020-07-14 21:58:55'),
(3, '40.44603260481925,50.00822067260743', '40.46118482163287,50.028820037841804', '300', '53.66302073533387', 2427, '2020-07-16', '03:00:00', '2020-07-16', '03:08:05', '2020-07-14 21:58:55', '2020-07-14 21:58:55'),
(4, '40.434143560495514,50.039806365966804', '40.495395357331105,49.972343444824226', '300', '-47.76266288239526', 8896, '2020-07-16', '03:10:00', '2020-07-16', '03:39:39', '2020-07-15 03:18:06', '2020-07-15 03:18:06'),
(5, '40.52032411158934,49.92118835449219', '40.42656483076295,50.06744384765626', '300', '122.66251188210252', 16196, '2020-07-16', '03:10:00', '2020-07-16', '04:03:59', '2020-07-15 18:13:15', '2020-07-15 18:13:15'),
(6, '40.41924662614147,50.04135131835938', '40.506490449822046,49.997062683105476', '300', '-26.914266039098038', 10411, '2020-07-16', '03:10:00', '2020-07-16', '03:44:42', '2020-07-15 18:13:15', '2020-07-15 18:13:15'),
(7, '40.512233070981864,49.81784820556641', '40.561807971278185,50.06092071533204', '300', '78.4725606942383', 21292, '2020-07-16', '03:00:00', '2020-07-16', '04:10:58', '2020-07-15 22:23:46', '2020-07-15 22:23:46'),
(8, '40.44093755756703,49.82368469238282', '40.36956635131763,50.02967834472657', '300', '109.10981185278051', 19184, '2020-07-16', '03:00:00', '2020-07-16', '04:03:56', '2020-07-15 22:23:46', '2020-07-15 22:23:46'),
(9, '40.49160955299775,49.77115631103516', '40.42473535424809,49.91878509521485', '300', '114.36999810244637', 14552, '2020-07-16', '03:10:00', '2020-07-16', '03:58:30', '2020-07-15 22:33:05', '2020-07-15 22:33:05'),
(10, '40.35857944937875,50.22468566894532', '40.49813666850851,50.184860229492195', '300', '-15.92715530503232', 15898, '2020-07-16', '03:20:00', '2020-07-16', '04:12:59', '2020-07-16 00:18:38', '2020-07-16 00:18:38'),
(11, '40.36590424964641,50.08186340332032', '40.49709237269567,50.218505859375', '300', '46.166659426448064', 18637, '2020-07-16', '03:20:00', '2020-07-16', '04:22:07', '2020-07-16 00:18:38', '2020-07-16 00:18:38'),
(12, '40.37662841404851,49.87586975097657', '40.50074733692463,49.87380981445313', '300', '-0.9508206441619568', 13818, '2020-07-16', '03:20:00', '2020-07-16', '04:06:03', '2020-07-16 00:39:36', '2020-07-16 00:39:36'),
(13, '40.42107625193686,50.11310577392578', '40.500225211369,50.09799957275391', '300', '-10.805398925233563', 8903, '2020-07-16', '03:20:00', '2020-07-16', '03:49:40', '2020-07-16 00:39:36', '2020-07-16 00:39:36'),
(14, '40.57406557621749,49.898185729980476', '40.5268484330944,50.05680084228516', '300', '106.57741377805814', 14409, '2020-07-16', '03:25:00', '2020-07-16', '04:13:01', '2020-07-16 09:13:00', '2020-07-16 09:13:00'),
(15, '40.470979694762356,50.34381866455079', '40.393888118201176,50.15430450439453', '300', '-112.13576963258986', 18207, '2020-07-16', '03:25:00', '2020-07-16', '04:25:41', '2020-07-16 09:13:00', '2020-07-16 09:13:00');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;

-- Dumping structure for table map.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unique` (`token`),
  KEY `tokens_user_id_foreign` (`user_id`),
  KEY `tokens_token_index` (`token`),
  CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table map.tokens: ~0 rows (approximately)
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;

-- Dumping structure for table map.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table map.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
