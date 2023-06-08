-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 04:26 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `synoptic`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$KX2xzJUuXtTpP6LKv3IuLebp9TCtRA0/R7jzT5X4fa.nkQW0c9vBG', 'Test', 'Admin', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `charities`
--

CREATE TABLE `charities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `official_url` varchar(255) NOT NULL,
  `google_map_url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_ext` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `charities`
--

INSERT INTO `charities` (`id`, `name`, `address`, `official_url`, `google_map_url`, `image`, `image_ext`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'British Heart Foundation', 'Unit 1, 795 Govan Rd, Govan, Glasgow G51 3JW', 'https://www.bhf.org.uk/what-we-do/find-bhf-near-you/govan-bhf-shop', 'https://www.google.com/maps/place/British+Heart+Foundation/@55.8625535,-4.3153246,17z/data=!3m1!4b1!4m6!3m5!1s0x488845e067e6e23b:0x83e83eae0dcf77a8!8m2!3d55.8625505!4d-4.3127497!16s%2Fg%2F1tmqfs_b?entry=ttu', '/images/charity/British_Heart_Foundation.png', '.png', 1, NULL, NULL, NULL),
(2, 'The Prince & Princess Of Wales Hospice Shop', '11, Govan Cross Shopping Centre, Govan, Glasgow G51 3JW', 'https://www.princeandprincessofwaleshospice.org.uk/how-you-can-help/the-hospice-shops/find-your-local-hospice/govan-cross-shop', 'https://www.google.com/maps/place/The+Prince+%26+Princess+Of+Wales+Hospice+Shop/@55.862595,-4.3153399,17z/data=!3m1!4b1!4m6!3m5!1s0x488845e067eaaaab:0x202f63152d5e2538!8m2!3d55.862592!4d-4.312765!16s%2Fg%2F11by_qjb64?entry=ttu', '/images/charity/the-prince-princess-of-wales-hospice-prince-and.png', '.png', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `communities`
--

CREATE TABLE `communities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `est_year` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_ext` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `communities`
--

INSERT INTO `communities` (`id`, `name`, `est_year`, `image`, `image_ext`, `description`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Arab', 2020, '/images/community/arab.jpg', '.jpg', NULL, 1, NULL, NULL, NULL),
(2, 'Chinese', 2019, '/images/community/chinese.png', '.png', NULL, 1, NULL, NULL, NULL),
(3, 'Spain', 2021, '/images/community/spain.png', '.png', NULL, 1, NULL, NULL, NULL),
(4, 'France', 2020, '/images/community/france.png', '.png', NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `organiser` varchar(255) NOT NULL,
  `organiser_image` varchar(255) NOT NULL DEFAULT '/images/course/moma.png',
  `description` longtext DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_ext` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `organiser`, `organiser_image`, `description`, `url`, `image`, `image_ext`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'The Professional Art Masterclass', 'The Museum of Modern Art', '/images/course/moma.png', NULL, 'https://www.professional-art-masterclass.ac.uk', '/images/course/art-masterclass.png', '.png', 1, NULL, NULL, NULL),
(2, 'Premiere Pro CC for Beginners', 'The Museum of Modern Art', '/images/course/moma.png', NULL, 'https://www.premiere-pro-cc-for-beginners.ac.uk', '/images/course/premiere.png', '.png', 1, NULL, NULL, NULL),
(3, 'Electricity & Magnetism', 'Duke University', '/images/course/y.png', NULL, 'https://www.electricity-and-magnetism.ac.uk', '/images/course/electricity.png', '.png', 1, NULL, NULL, NULL),
(4, 'School chemistry beta', 'Duke University', '/images/course/school.png', NULL, 'https://www.school-chemistry-beta.ac.uk', '/images/course/chemistry.png', '.png', 1, NULL, NULL, NULL),
(5, 'Modernism in Oriental Art', 'The Museum of Modern Art', '/images/course/moma.png', NULL, 'https://www.modernism-in-oriental-art.ac.uk', '/images/course/oriental-art.png', '.png', 1, NULL, NULL, NULL),
(6, 'Compositions in Visual Art', 'The Museum of Modern Art', '/images/course/cal-arts.png', NULL, 'https://www.compositions-in-visual-art.ac.uk', '/images/course/visual-art.png', '.png', 1, NULL, NULL, NULL),
(7, 'High school physics', 'The Museum of Modern Art', '/images/course/school-physics.png', NULL, 'https://www.high-school-physics.ac.uk', '/images/course/physics.png', '.png', 1, NULL, NULL, NULL),
(8, 'Color Grading with Da Vinci', 'Duke University', '/images/course/moma.png', NULL, 'https://www.color-grading-with-da-vinci.ac.uk', '/images/course/davinci.png', '.png', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `news_category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_ext` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `news_category_id`, `title`, `description`, `image`, `image_ext`, `url`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Glasgow\'s Riverside Festival to celebrate 10 years of electronic dance music this summer', NULL, '/images/news/1_RF22.jpg', '.jpp', 'https://www.glasgowlive.co.uk/whats-on/music-nightlife-news/glasgows-riverside-festival-celebrate-10-26803020', '2023-04-11 23:00:00', NULL, NULL),
(2, 3, 'Woman\'s body discovered in Glasgow flat as police remain on scene', NULL, '/images/news/woman-body-found.png', '.png', 'https://www.glasgowlive.co.uk/news/glasgow-news/womans-body-discovered-glasgow-flat-26775375', '2023-05-31 23:00:00', NULL, NULL),
(3, 5, 'Dramatic footage shows major Glasgow Anniesland flooding after burst water pipe', NULL, '/images/news/construction.jpg', '.jpg', 'https://www.glasgowlive.co.uk/news/glasgow-news/dramatic-footage-shows-major-glasgow-26747722', '2023-05-03 23:00:00', NULL, NULL),
(4, 5, 'Loyalist Govan riot thug identified by Lacoste hoodie after \'large scale disturbance\'', NULL, '/images/news/2_Screenshot-2019-08-30-at-200856.png', '.png', 'https://www.glasgowlive.co.uk/news/loyalist-govan-riot-thug-identified-26676329', '2023-04-12 23:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `news_categories`
--

CREATE TABLE `news_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news_categories`
--

INSERT INTO `news_categories` (`id`, `name`, `description`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Asia Media', 'Asia Media', 1, NULL, NULL, NULL),
(2, 'Finance', 'Business, Finance & Economics', 1, NULL, NULL, NULL),
(3, 'Technology', 'Computers, Science & Technology', 1, NULL, NULL, NULL),
(4, 'Entertainment', 'Entertainment, Art & Culture', 1, NULL, NULL, NULL),
(5, 'Health', 'Health & Medicine', 1, NULL, NULL, NULL),
(6, 'Lifestyle', 'Lifestyle', 1, NULL, NULL, NULL),
(7, 'Sport', 'Sport & Leisure', 1, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `charities`
--
ALTER TABLE `charities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_news_category_id_foreign` (`news_category_id`);

--
-- Indexes for table `news_categories`
--
ALTER TABLE `news_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `charities`
--
ALTER TABLE `charities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `communities`
--
ALTER TABLE `communities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_news_category_id_foreign` FOREIGN KEY (`news_category_id`) REFERENCES `news_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
