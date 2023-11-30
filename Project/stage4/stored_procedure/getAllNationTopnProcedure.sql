USE youtube_backup;
DELIMITER //

CREATE PROCEDURE GetAllNationsTopn(IN num INT)
BEGIN
    -- Declare cursor and control variables for nations
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_nationid INT;


    -- Declare variables for videos
--     DECLARE done_videos INT DEFAULT FALSE;
    DECLARE cur_video_id VARCHAR(255);
    DECLARE cur_title VARCHAR(255);
    DECLARE cur_total_views INT;
    
    
    DECLARE nations_cursor CURSOR FOR 
        SELECT Nationid 
        FROM View
        GROUP BY Nationid
        HAVING COUNT(DISTINCT Video_id) > num;
--     DECLARE CONTINUE HANDLER FOR NOT FOUND SET done_nations = TRUE;    
    
    
    DECLARE videos_cursor CURSOR FOR 
		SELECT Video.Video_id, Video.Title, v.TotalViews
		FROM (
			SELECT Video_id, SUM(Views) AS TotalViews
			FROM View
			WHERE Nationid = nationid
			GROUP BY Video_id
			ORDER BY TotalViews DESC
			LIMIT num
		) AS v
		INNER JOIN Video ON Video.Video_id = v.Video_id;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;


    -- Open the nations cursor
    OPEN nations_cursor;
	DROP TABLE IF EXISTS AllNationTopnTable;
	CREATE TABLE AllNationTopnTable (
		Nationid INT,
		Video_id VARCHAR(255),
		Title VARCHAR(255),
		TotalViews INT
	);
    -- Loop through each nation
    nations_loop: LOOP
        FETCH nations_cursor INTO cur_nationid;
        IF done THEN
            LEAVE nations_loop;
        END IF;

        -- Open the videos cursor
        OPEN videos_cursor;

        -- Loop through the top 5 videos for the current nation
        videos_loop: LOOP
            FETCH videos_cursor INTO cur_video_id, cur_title, cur_total_views;
            IF done THEN
                LEAVE videos_loop;
            END IF;

            -- Insert each row into NationTop5
            INSERT INTO AllNationTopnTable (Nationid, Video_id, Title, TotalViews)
            VALUES (cur_nationid, cur_video_id, cur_title, cur_total_views);
        END LOOP videos_loop;

        CLOSE videos_cursor;
        SET done = FALSE; -- Reset the done_videos flag for the next iteration
    END LOOP nations_loop;

    CLOSE nations_cursor;
END //

DELIMITER ; 