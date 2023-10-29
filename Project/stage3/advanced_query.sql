USE youtube;
SET SQL_SAFE_UPDATES = 0;


SELECT sum(vi.Views)
FROM Video as v
JOIN View as vi on v.Video_id=vi.Video_id
GROUP BY vi.Nationid;

SELECT t.Nationid, MAX(t.Views) 
FROM (
    SELECT *
    FROM View
    WHERE Likes>400000
) as t 
GROUP BY Nationid; 

(
SELECT Nationid,Video_id
FROM View 
WHERE Nationid=1 
ORDER BY Views 
LIMIT 10
)
UNION ALL
(
SELECT Nationid,Video_id
FROM View 
WHERE Nationid=2
ORDER BY Views 
LIMIT 10
);