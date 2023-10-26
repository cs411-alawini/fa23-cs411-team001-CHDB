use youtube; 
-- CREATE TABLE Channels (
--    Channel_Title VARCHAR(255) PRIMARY KEY,
--    Channel_MostLike_VideoId INT,
--    Channel_MostDislike_VideoId INT
-- );

-- CREATE TABLE Category (
--    Category_Id INT PRIMARY KEY AUTO_INCREMENT,
--    Video_Count INT,
--    Category_Name VARCHAR(255),
--    Category_MostLike_VideoId INT
-- );

-- CREATE TABLE Tag (
--    Tag_Name VARCHAR(255) PRIMARY KEY,
--    Video_Number INT,
--    Tag_MostLike_VideoId INT,
--    Tag_MostDislike_VideoId INT,
--    Tag_MostPopular_Channel INT
-- );


use youtube;
-- SET FOREIGN_KEY_CHECKS = 0;

-- -- DROP TABLE Category;-
-- DROP TABLE Video;
-- SET FOREIGN_KEY_CHECKS = 1;
-- ALTER TABLE channel
-- ADD PRIMARY KEY (channel_id);

-- CREATE TABLE Channels (
--    Channel_Id VARCHAR(30) PRIMARY KEY,
--    Channel_Title VARCHAR(255),
--    Channel_MostLike_VideoId INT,
--    Channel_MostDislike_VideoId INT
-- );
-- CREATE TABLE Category (
--    Category_Id INT PRIMARY KEY,
--    Video_Count INT,
--    Category_Name VARCHAR(255),
--    Category_MostLike_VideoId INT
-- );
-- CREATE TABLE Video(
-- Video_id VARCHAR(255) PRIMARY KEY,
-- Title VARCHAR(255),
-- Channel_Id VARCHAR(30),
-- Category_Id INT,
-- Tag_Name VARCHAR(255),
-- Publish_time DATE,
-- FOREIGN KEY (Channel_Id) REFERENCES Channels(Channel_Id),
-- FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id)
-- );
DROP TABLE Tag;
