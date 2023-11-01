


use youtube;
SET FOREIGN_KEY_CHECKS = 0;

-- DROP TABLE Category;-
-- DROP TABLE Video;
-- SET FOREIGN_KEY_CHECKS = 1;
-- ALTER TABLE channel
-- ADD PRIMARY KEY (channel_id);


CREATE TABLE Nation(
	Nationid INT PRIMARY KEY,
    NationName VARCHAR(50),
    Nation_Mostlike_VideoId VARCHAR(50),
    Play_Volume INT
);
CREATE TABLE Time(
	Trending_Date VARCHAR(50) PRIMARY KEY,
    Time_Mostviewed_VideoId VARCHAR(50),
    Time_Mostlike_VideoId VARCHAR(50),
	Time_Mostdislike_VideoId VARCHAR(50)
);

CREATE TABLE Channels (
   Channel_Id VARCHAR(30) PRIMARY KEY,
   Channel_Title VARCHAR(255),
   Channel_MostLike_VideoId VARCHAR(255),
   Channel_MostDislike_VideoId VARCHAR(255)
);
CREATE TABLE Category (
   Category_Id INT PRIMARY KEY,
   Video_Count INT,
   Category_Name VARCHAR(255),
   Category_MostLike_VideoId VARCHAR(255)
);
CREATE TABLE Video(
    Video_id VARCHAR(255) PRIMARY KEY,
    Title VARCHAR(255),
    Channel_Id VARCHAR(30),
    Category_Id INT,
    Tag_Name VARCHAR(255),
    Publish_time DATE,
    FOREIGN KEY (Channel_Id) REFERENCES Channels(Channel_Id),
    FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id)
);
CREATE TABLE View(
	View_id INT PRIMARY KEY AUTO_INCREMENT,
    Video_id VARCHAR(50), 
    Nationid INT,
    Likes INT,
    Dislikes INT,
    Views INT,
    trending_date VARCHAR(50),
    FOREIGN KEY (Video_id) REFERENCES Video(Video_id),
	FOREIGN KEY (Nationid) REFERENCES Nation(Nationid),
    FOREIGN KEY (Trending_Date) REFERENCES Time(Trending_Date)
)
-- DROP TABLE Tag;
