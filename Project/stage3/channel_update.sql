-- Find the most liked and disliked video for each channel
use youtube;
SET SQL_SAFE_UPDATES = 0;
UPDATE Channels
SET 
    Channel_MostLike_VideoId = (
        SELECT v.Video_id
        FROM Video AS v
        JOIN View AS vi ON v.Video_id = vi.Video_id
        WHERE v.Channel_Id = Channels.Channel_Id
        ORDER BY vi.Likes DESC
        LIMIT 1
    ),
    Channel_MostDislike_VideoId = (
        SELECT v.Video_id
        FROM Video AS v
        JOIN View AS vi ON v.Video_id = vi.Video_id
        WHERE v.Channel_Id = Channels.Channel_Id
        ORDER BY vi.Dislikes DESC
        LIMIT 1
    );