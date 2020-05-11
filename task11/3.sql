SELECT 
    *
FROM
    mydb.post
WHERE
    user_id = 1
        AND description LIKE '%hello%';