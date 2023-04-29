CREATE OR REPLACE FUNCTION create_username() RETURNS trigger AS $create_username$

BEGIN

    UPDATE users 
    SET username = display_name || '#' || id
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$create_username$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER add_username
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_username();


CREATE OR REPLACE FUNCTION getPosts(tagsList text[]) RETURNS TABLE (id INTEGER,
	owner_user_id INTEGER,
	last_editor_user_id INTEGER,
	post_type_id SMALLINT,
	accepted_answer_id INTEGER,
	score INTEGER,
	parent_id INTEGER,
	view_count INTEGER,
	answer_count INTEGER,
	comment_count INTEGER,
	owner_display_name VARCHAR(64),
	last_editor_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	content_license VARCHAR(64),
	body TEXT,
	favorite_count INTEGER,
	creation_date TIMESTAMP,
	community_owned_date TIMESTAMP,
	closed_date TIMESTAMP,
	last_edit_date TIMESTAMP,
	last_activity_date TIMESTAMP) AS $printStrings$  
DECLARE  
   tag_num integer := array_length(tagsList, 1);  
   i integer := 2;  
BEGIN 

    DROP TABLE IF EXISTS tag_temp;
    CREATE TEMP TABLE tag_temp(id INTEGER,
	owner_user_id INTEGER,
	last_editor_user_id INTEGER,
	post_type_id SMALLINT,
	accepted_answer_id INTEGER,
	score INTEGER,
	parent_id INTEGER,
	view_count INTEGER,
	answer_count INTEGER,
	comment_count INTEGER,
	owner_display_name VARCHAR(64),
	last_editor_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	content_license VARCHAR(64),
	body TEXT,
	favorite_count INTEGER,
	creation_date TIMESTAMP,
	community_owned_date TIMESTAMP,
	closed_date TIMESTAMP,
	last_edit_date TIMESTAMP,
	last_activity_date TIMESTAMP);

      DROP TABLE IF EXISTS temporary;
    CREATE TEMP TABLE temporary(id INTEGER,
	owner_user_id INTEGER,
	last_editor_user_id INTEGER,
	post_type_id SMALLINT,
	accepted_answer_id INTEGER,
	score INTEGER,
	parent_id INTEGER,
	view_count INTEGER,
	answer_count INTEGER,
	comment_count INTEGER,
	owner_display_name VARCHAR(64),
	last_editor_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	content_license VARCHAR(64),
	body TEXT,
	favorite_count INTEGER,
	creation_date TIMESTAMP,
	community_owned_date TIMESTAMP,
	closed_date TIMESTAMP,
	last_edit_date TIMESTAMP,
	last_activity_date TIMESTAMP);
    
    --Atleast one tag exists

    INSERT INTO temporary (SELECT * FROM posts where posts.tags LIKE  '%<'||tagsList[1]||'>%');
    INSERT INTO tag_temp (SELECT * FROM temporary);
    DELETE FROM temporary;
   WHILE i <= tag_num LOOP  
      INSERT INTO temporary ((SELECT * from tag_temp) INTERSECT (SELECT * FROM posts WHERE posts.tags LIKE  '%<'||tagsList[i]||'>%')) ;
      DELETE FROM tag_temp;
      INSERT INTO tag_temp (SELECT * FROM temporary);
      DELETE FROM temporary;
      i = i + 1;
   END LOOP; 
   RETURN QUERY SELECT * FROM tag_temp; 
END;  
$printStrings$ LANGUAGE plpgsql; 

