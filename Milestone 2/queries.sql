--adding new user i.e user account creation

INSERT INTO users (reputation, display_name, creation_date,about_me,last_access_date)
VALUES (0, 'some_user', CURRENT_TIMESTAMP, '<p>Likes: helping people, software and technology, personal finance, consumer protection..</p>', CURRENT_TIMESTAMP);


--deleting a user with given id
UPDATE posts SET owner_user_id= NULL, owner_display_name=(select display_name from users where id='828') where owner_user_id='828';

--fetch user info given id
select * from users where id='828';

--fetch badges earned given id
select count(*) from badges where class=1 and user_id='828';
select count(*) from badges where class=2 and user_id='828';
Select count(*) from badges where class=3 and user_id='828';

--Fetch top-k posts of user (top k with highest upvotes)
With t1 as (select id from posts where owner_user_id='828'), 
t2 as (select post_id,count(*) as cnt from votes where post_id in (select id from t1) and vote_type_id=2 group by post_id) select post_id from t2 order by cnt desc limit 5;


--updating user profile info
UPDATE users set display_name='new_name',about_me='<p>Im a stock market investor</p>' Where id='828';



--Once a post is clicked, we can load all the comments

select * from COMMENTS where COMMENTS.post_id=2 order by creation_date desc limit 5;

--Next k comments ordered by creation date

select * from COMMENTS where COMMENTS.post_id=2 order by creation_date desc limit 5 offset 5;


---finding upvotes given post_id
Select count(*) from VOTES where VOTES.vote_type_id=2 and post_id=2;

--finding downvotes given post_id
Select count(*) from VOTES where VOTES.vote_type_id=3 and post_id=2;



--fetch top-k question posts based on upvotes for home page
With t as (select post_id from votes,posts where vote_type_id=2 and votes.post_id=posts.id and posts.post_type_id=1 group by post_id order by count(*) desc limit 5) select * from posts where id in (select post_id from t);


--fetch top-k question posts after offset
With t as (select post_id from votes,posts where vote_type_id=2 and votes.post_id=posts.id and posts.post_type_id=1 group by post_id order by count(*) desc limit 5 offset 5) select * from posts where id in (select post_id from t);


--fetch post info given post id
Select * from POSTS where POSTS.id=2;


--retrieve top-k posts having a certain tag
With t as (select id from posts where tags like '%discussion%'), t1 as (select post_id,count(*)  as cnt from votes,posts where vote_type_id=2 and post_id in (select id from t) and votes.post_id=posts.id and posts.post_type_id=1 group by post_id order by cnt desc limit 5) select * from posts where id in (select post_id from t1);


--retrieve top-k question posts having with certain keyword
with t as (select id from posts where title like '%links%'), t1 as (select post_id,count(*)  as cnt from votes,posts where vote_type_id=2 and post_id in (select id from t) and votes.post_id=posts.id and posts.post_type_id=1 group by post_id order by cnt desc limit 5) select * from posts where id in (select post_id from t1);



--comments pertaining to a post;
Select * from COMMENTS where COMMENTS.POST_id=2;


--Retrieving answer posts given question post id:
select * from posts where parent_id='2' and post_type_id=2;


--upvote cast by a user
Update users set up_votes=up_votes+1 where id='828';



--Update votes table
Insert into votes(id,user_id,post_id,vote_type_id,creation_date) values (DEFAULT,828,2,2,CURRENT_TIMESTAMP)

--Delete in votes table
Delete from votes where user_id=828 and post_id=2;


--Remove comment to a post
Update posts set comment_count=comment_count-1 where id=(select post_id from comments where id=7);
delete from COMMENTS where id=’7’;


--Deleting from posts links
delete from post_links where post_id=2 or related_post_id=2;

--deleting all comments
delete from comments where post_id=2;

--Deleting from votes
delete from votes where post_id=2;

--Finally, delete from posts table
delete from posts where id=2;

--checking user who post belongs to for allowing editing
Select case when exists (Select owner_user_id from posts where id=2 and owner_user_id is NULL) then False when exists (Select owner_user_id from posts where id=2 and owner_user_id is not NULL and owner_user_id=828) then True end as allowed_to_edit;


--Only title, body and tags of a post can be edited
INSERT INTO posts (title, tags, body, last_edit_date,last_activity_date, post_type_id, score, creation_date)
VALUES ( 'New Title', 'New Tags', 'Edited body',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,1, 0, CURRENT_TIMESTAMP);

--Retrieving user_id of question owner
Select owner_user_id from posts where id=(Select parent_id from posts where id='2')


--Updating accepted_answer_id in question post  
update posts set accepted_answer_id= 2 where id=(select parent_id from posts where id=2)

--creating a post (if it is answer post, parent_id can’t be null)
INSERT INTO posts (owner_user_id, post_type_id, score, title, body, creation_date)
VALUES (-1, 1, 0, 'Some post', 'Some text', CURRENT_TIMESTAMP);

--Updating comment count in posts table after inserting comment
update posts set comment_count=comment_count+1 where id=2;

--If answer update post table answer_count corresponding to question post
Update posts set answer_count=answer_count+1 where id=2;

--(Gold Badge if user’s post’s views are more than 5000)
Select SUM(POSTS.view_count) from POSTS where POSTS.owner_user_id = 828


--(Experienced Badge if user has more than 50 posts with total views of at-least 200)
With t1 as (select * from posts where view_count>=200 and owner_user_id=898)
Select count(id) from t1 where t1.owner_user_id = 828 group by t1.owner_user_id




--All indexes
create index I1 on votes(vote_type_id);
create index I2 on posts(post_type_id);
create index I3 on comments(post_id);
create index I4 on posts(parent_id,post_type_id);
create index I5 on posts(owner_user_id);
create index I6 on badges(class,user_id);
create index I7 on votes(vote_type_id,post_id);
create index I8 on posts(id,owner_user_id);
create index I9 on posts(owner_user_id);
create index I10 on posts(view_count,owner_user_id);










