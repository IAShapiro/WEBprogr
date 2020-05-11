SELECT 
    user_id
FROM
    mydb.post
GROUP BY user_id
HAVING (COUNT(user_id) > 3)