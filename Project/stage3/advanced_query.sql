USE youtube;
SET SQL_SAFE_UPDATES = 0;

SELECT t.Nationid, MAX(t.Views) 
FROM (
    SELECT *
    FROM View
    WHERE Likes>400000
) as t 
GROUP BY Nationid; 

SELECT t.Channel_Id,SUM(View.Likes)
FROM
(
    (
        SELECT *
        FROM Video
        WHERE Title LIKE '%game%'
    )
    UNION
    (
        SELECT *
        FROM Video
        WHERE Title LIKE '%xbox%'
    )
) as t 
INNER JOIN View on t.Video_id=View.Video_id
GROUP BY t.Channel_Id
ORDER BY SUM(View.Likes) DESC;