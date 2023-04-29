-- Users
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	account_id NUMERIC(10, 2),
	views INTEGER DEFAULT 0,
	down_votes INTEGER DEFAULT 0,
	up_votes INTEGER DEFAULT 0,
	display_name VARCHAR(255) NOT NULL,
	location VARCHAR(512),
	profile_image_url VARCHAR(255),
	about_me TEXT,
	creation_date TIMESTAMP NOT NULL,
	reputation INTEGER NOT NULL,
    username VARCHAR(300), -- added
    passsword VARCHAR(350) DEFAULT 'user123' --added --edited later using bcrypt in node so that all users have default password username
	-- last_access_date TIMESTAMP NOT NULL, --remove
	-- website_url VARCHAR(255), --remove
);

	
-- Posts
CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	owner_user_id INTEGER,
	post_type_id SMALLINT NOT NULL, -- 1 - question 2 - answer 
	accepted_answer_id INTEGER, -- NULL for now
	score INTEGER NOT NULL,
	parent_id INTEGER,
	view_count INTEGER, -- for answers NULL
	owner_display_name VARCHAR(64), 
	title VARCHAR(512), 
	tags VARCHAR(512),
	content_license VARCHAR(64) NOT NULL, 
	body TEXT,
	favorite_count INTEGER, // remove 
	creation_date TIMESTAMP NOT NULL,
	-- comment_count INTEGER DEFAULT 0, -- remove
	-- answer_count INTEGER DEFAULT 0, -- remove
	-- last_editor_display_name VARCHAR(64),  --remove
	--community_owned_date TIMESTAMP, -- remove
	--closed_date TIMESTAMP, -- remove
	--last_edit_date TIMESTAMP, -- remove
	--last_activity_date TIMESTAMP -- remove
);


-- Votes // 2 - upmode 3 - downmode vote_type_id
CREATE TABLE votes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	post_id INTEGER NOT NULL,
	vote_type_id SMALLINT NOT NULL,
	bounty_amount SMALLINT, -- remove
	creation_date TIMESTAMP NOT NULL 
);


-- Tags
CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	tag_name VARCHAR(255) NOT NULL,
	count INTEGER DEFAULT 0 
	--excerpt_post_id INTEGER, -- remove
	--wiki_post_id INTEGER, -- remove
);