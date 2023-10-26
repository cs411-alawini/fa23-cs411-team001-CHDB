-- Update the Category table with the number of videos in each category and the most liked video in each category
INSERT INTO Category (Category_Id, Category_Name) VALUES 
('1', 'Film & Animation'),
('2', 'Autos & Vehicles'),
('10', 'Music'),
('15', 'Pets & Animals'),
('17', 'Sports'),
('18', 'Short Movies'),
('19', 'Travel & Events'),
('20', 'Gaming'),
('21', 'Videoblogging'),
('22', 'People & Blogs'),
('23', 'Comedy'),
('24', 'Entertainment'),
('25', 'News & Politics'),
('26', 'Howto & Style'),
('27', 'Education'),
('28', 'Science & Technology'),
('29', 'Nonprofits & Activism'),
('30', 'Movies'),
('31', 'Anime/Animation'),
('32', 'Action/Adventure'),
('33', 'Classics'),
('34', 'Comedy'),
('35', 'Documentary'),
('36', 'Drama'),
('37', 'Family'),
('38', 'Foreign'),
('39', 'Horror'),
('40', 'Sci-Fi/Fantasy'),
('41', 'Thriller'),
('42', 'Shorts'),
('43', 'Shows');

UPDATE Category
SET 
    Video_Count = (
        SELECT COUNT(*)
        FROM Video AS v
        JOIN Category AS c ON v.Category_Id = c.Category_Id
        WHERE v.Category_Id = Category.Category_Id
        GROUP BY v.Category_Id
    ),
    Category_MostLike_VideoId = (
        SELECT v.Video_id
        FROM Video AS v
        JOIN View AS vi ON v.Video_id = vi.Video_id
        WHERE v.Category_Id = Category.Category_Id
        ORDER BY vi.Likes DESC
        LIMIT 1
    )