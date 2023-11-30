USE youtube_backup;
DELIMITER //

CREATE PROCEDURE getNationTop5(IN nationid INT)
BEGIN 
    SELECT Video.Video_id, Video.Title, v.TotalViews
    FROM (
        SELECT Video_id, SUM(Views) AS TotalViews
        FROM View
        WHERE Nationid = nationid
        GROUP BY Video_id
        ORDER BY TotalViews DESC
        LIMIT 5
    ) AS v
    INNER JOIN Video ON Video.Video_id = v.Video_id;
END //

DELIMITER ;

