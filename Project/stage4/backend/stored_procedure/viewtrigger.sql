
USE youtube_backup;
DELIMITER $$

CREATE TRIGGER FkTrig
BEFORE INSERT ON View
    FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1
                   FROM Video
                   WHERE Video_id = NEW.Video_id) THEN
        INSERT INTO Video(Video_id, Title, Channel_Id, Category_Id,Tag_Name,Publish_time)
        VALUES (NEW.Video_id, DEFAULT, DEFAULT, DEFAULT,DEFAULT,DEFAULT);
	END IF;
    IF NOT EXISTS (SELECT 1
                   FROM Time
                   WHERE Trending_Date = NEW.Trending_date) THEN
        INSERT INTO Time(Trending_Date, Time_Mostviewed_VideoId, Time_Mostlike_VideoId, Time_Mostdislike_VideoId)
        VALUES (NEW.Trending_date, new.Video_id, new.Video_id, new.Video_id);
     ELSE
		SET @viewvar=(SELECT MAX(Views)
					  FROM View
                      WHERE Trending_Date = NEW.Trending_date);
		SET @likevar=(SELECT MAX(Likes)
					  FROM View
                      WHERE Trending_Date = NEW.Trending_date);
		SET @dislikevar=(SELECT MAX(Dislikes)
					  FROM View
                      WHERE Trending_Date = NEW.Trending_date);  
		IF @viewvar < new.Views THEN
			UPDATE Time SET Time_Mostviewed_VideoId = NEW.Video_id WHERE Trending_Date=NEW.Trending_date;
		END IF;
 		IF @likevar < NEW.Likes THEN
			UPDATE Time SET Time_Mostlike_VideoId = NEW.Video_id WHERE Trending_Date=NEW.Trending_date;
		END IF;       
		IF @dislikevar < NEW.Dislikes THEN
			UPDATE Time SET Time_Mostdislike_VideoId = NEW.Video_id WHERE Trending_Date=NEW.Trending_date;
		END IF;     
    END IF;

    IF NOT EXISTS (SELECT 1
                   FROM Nation
                   WHERE Nationid = NEW.Nationid) THEN
        INSERT INTO Nation(Nationid,NationName,Nation_Mostlike_VideoId,Play_Volume)
        VALUES (NEW.Nationid, DEFAULT, NEW.Video_id, NEW.Views);
        
	ELSE 
		SET @likenationvar=(SELECT MAX(Likes)
							  FROM View
							  WHERE Nationid = NEW.Nationid);
 		IF @likenationvar < NEW.Likes THEN
			UPDATE Nation SET Nation_Mostlike_VideoId = NEW.Video_id WHERE Nationid=NEW.Nationid;
		END IF; 	
        UPDATE Nation SET Play_Volume = NEW.Views+Play_Volume WHERE Nationid=NEW.Nationid;
	END IF;
END$$

DELIMITER ;