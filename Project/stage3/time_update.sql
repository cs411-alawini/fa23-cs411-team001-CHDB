use youtube;
SET SQL_SAFE_UPDATES = 0;
UPDATE Time
SET 
    Time_MostViewed_VideoId = (
        SELECT v.Video_id
        FROM View AS vi 
        WHERE v.Trending_Date = Time.Trending_Date
        ORDER BY vi.Views DESC
        LIMIT 1
    ),
    Time_MostLike_VideoId = (
        SELECT v.Video_id
        FROM View AS vi 
        WHERE v.Trending_Date = Time.Trending_Date
        ORDER BY vi.Likes DESC
        LIMIT 1
    ),
    Time_MostDislike_VideoId = (
        SELECT v.Video_id
        FROM View AS vi 
        WHERE v.Trending_Date = Time.Trending_Date
        ORDER BY vi.Dislikes DESC
        LIMIT 1
    );
    SET SQL_SAFE_UPDATES = 1;