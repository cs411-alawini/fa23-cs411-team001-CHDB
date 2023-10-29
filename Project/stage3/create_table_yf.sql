


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
--    Channel_MostLike_VideoId VARCHAR(255),
--    Channel_MostDislike_VideoId VARCHAR(255)
-- );
-- CREATE TABLE Category (
--    Category_Id INT PRIMARY KEY,
--    Video_Count INT,
--    Category_Name VARCHAR(255),
--    Category_MostLike_VideoId VARCHAR(255)
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
