UPDATE Nation
SET Nation_Mostlike_VideoId = (
    SELECT v.Video_id
    FROM Video AS v
    JOIN View AS vi ON v.Video_id = vi.Video_id
    WHERE v.Nation_Id = Nation.Nation_Id
    ORDER BY vi.Likes DESC
    LIMIT 1
)