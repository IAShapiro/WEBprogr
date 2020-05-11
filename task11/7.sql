SELECT 
    DATEDIFF(CURDATE(), MIN(created_at))
FROM
    mydb.post;