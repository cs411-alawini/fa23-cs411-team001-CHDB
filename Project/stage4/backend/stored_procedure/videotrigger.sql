# Checking the Channels Table:
#
# When inserting new video information, the trigger first checks whether there is an existing channel (Channel_Id) corresponding to the new video in the Channels table.
# If no corresponding channel is found, the trigger inserts a new row in the Channels table using the new video's Channel_Id. Simultaneously, it sets the new video's Video_id as the initial value for the most liked and most disliked videos of that channel.
# Checking the Category Table:
#
# Next, the trigger checks whether there is an existing category (Category_Id) corresponding to the new video in the Category table.
# If no corresponding category is found, the trigger inserts a new row in the Category table using the new video's Category_Id, and sets the video count to 1. It also sets the new video's Video_id as the initial value for the most liked video of that category.
# If the corresponding category already exists, and if the new video’s Video_id is not present in the Video table, the trigger increases the video count (Video_Count) of that category.

USE youtube_backup;
DELIMITER $$

CREATE TRIGGER videoTrig
BEFORE INSERT ON Video
    FOR EACH ROW
BEGIN

    IF NOT EXISTS (SELECT 1
                   FROM Channels
                   WHERE Channel_Id = NEW.Channel_Id) THEN
        INSERT INTO Channels(Channel_Id,Channel_Title,Channel_MostLike_VideoId,Channel_MostDislike_VideoId)
        VALUES (NEW.Channel_Id, DEFAULT, NEW.Video_id, NEW.Video_id);
    END IF;

    IF NOT EXISTS (SELECT 1
                   FROM Category
                   WHERE Category_Id = NEW.Category_Id) THEN
        INSERT INTO Category(Category_Id,Video_Count,Category_Name,Category_MostLike_VideoId)
        VALUES (NEW.Category_Id, 1, DEFAULT, NEW.Video_id);
        
	ELSE 
		IF NOT EXISTS (SELECT 1
					   FROM Video
					   WHERE Video_id = NEW.Video_id) THEN
			UPDATE Category SET Video_Count = Video_Count+1 WHERE Category_Id=NEW.Category_Id;
		END IF; 	
	END IF;
END$$

DELIMITER ;