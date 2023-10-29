SET SQL_SAFE_UPDATES = 0;
UPDATE Nation
SET 
    Nation_Mostlike_VideoId = (
        SELECT v.Video_id
        FROM Video AS v
        JOIN View AS vi ON v.Video_id = vi.Video_id
        WHERE vi.Nationid = Nation.Nationid
        ORDER BY vi.Likes DESC
        LIMIT 1
),
    Play_Volume = (
        SELECT SUM(vi.Views)
        FROM Video AS v
        JOIN View AS vi ON v.Video_id = vi.Video_id
        WHERE vi.Nationid = Nation.Nationid
);
SET SQL_SAFE_UPDATES = 1;