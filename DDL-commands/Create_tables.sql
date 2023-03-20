DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS post_links;
DROP TABLE IF EXISTS post_history;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS tags;

-- Users
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	reputation INTEGER NOT NULL,
	views INTEGER DEFAULT 0,
	down_votes INTEGER DEFAULT 0,
	up_votes INTEGER DEFAULT 0,
	display_name VARCHAR(255) NOT NULL,
	location VARCHAR(512),
	website_url VARCHAR(255),
	about_me TEXT,
	creation_date TIMESTAMP NOT NULL,
	last_access_date TIMESTAMP NOT NULL,
    check(creation_date<=last_access_date)
);

-- Posts
CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	owner_user_id INTEGER,
	last_editor_user_id INTEGER,
	post_type_id SMALLINT NOT NULL,
	accepted_answer_id INTEGER,
	score INTEGER NOT NULL,
	parent_id INTEGER,
	view_count INTEGER,
	answer_count INTEGER DEFAULT 0,
	comment_count INTEGER DEFAULT 0,
	owner_display_name VARCHAR(64),
	last_editor_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	body TEXT,
	favorite_count INTEGER,
	creation_date TIMESTAMP NOT NULL,
	community_owned_date TIMESTAMP,
	closed_date TIMESTAMP,
	last_edit_date TIMESTAMP,
	last_activity_date TIMESTAMP,
	foreign key(owner_user_id) references users(id) on update cascade,
	foreign key(last_editor_user_id) references users(id) on update cascade,
	foreign key(parent_id) references posts(id) on delete cascade on update cascade,
	foreign key(accepted_answer_id) references posts(id) on delete set NULL on update cascade,
	check(post_type_id>=1 and post_type_id<=8)

	--make sure to insert questions before answers, initally accepted answer will be NULL, after answer is inserted
	--accepted it will be populated as accepted answer in question row trigger
);

-- PostLinks
CREATE TABLE post_links (
	id SERIAL PRIMARY KEY,
	related_post_id INTEGER NOT NULL,
	post_id INTEGER NOT NULL,
	link_type_id SMALLINT NOT NULL,
	creation_date TIMESTAMP NOT NULL,
	foreign key(related_post_id) references posts(id) on delete cascade on update cascade,
	foreign key(post_id) references posts(id) on delete cascade on update cascade,
	check(link_type_id in (1,2))
);

-- PostHistory
CREATE TABLE post_history (
	id SERIAL PRIMARY KEY,
	post_id INTEGER NOT NULL,
	user_id INTEGER,
	post_history_type_id SMALLINT NOT NULL,
	user_display_name VARCHAR(64),
	text TEXT,
	comment TEXT,
	creation_date TIMESTAMP NOT NULL,
    foreign key(post_id) references posts(id) on delete cascade on update cascade,
    foreign key(user_id) references users(id) on update cascade
);

-- Comments
CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	post_id INTEGER NOT NULL,
	user_id INTEGER,
	score SMALLINT NOT NULL,
	user_display_name VARCHAR(64),
	text TEXT,
	creation_date TIMESTAMP NOT NULL,
	foreign key(post_id) references posts(id) on delete cascade on update cascade,
	foreign key(user_id) references users(id) on update cascade


);

-- Votes
CREATE TABLE votes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	post_id INTEGER NOT NULL,
	vote_type_id SMALLINT NOT NULL,
	creation_date TIMESTAMP NOT NULL,
	foreign key(user_id) references users(id) on delete set NULL on update cascade,
	foreign key(post_id) references posts(id) on delete cascade on update cascade
);

-- Badges
CREATE TABLE badges (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	class SMALLINT NOT NULL,
	name VARCHAR(64) NOT NULL,
	tag_based BOOL NOT NULL,
	date TIMESTAMP NOT NULL,
	check(class in (1,2,3)),
	foreign key(user_id) references users(id) on delete cascade on update cascade
);

-- Tags
CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	excerpt_post_id INTEGER,
	wiki_post_id INTEGER,
	tag_name VARCHAR(255) NOT NULL,
	count INTEGER DEFAULT 0,
	foreign key(excerpt_post_id) references posts(id) on delete set NULL on update cascade,
	foreign key(wiki_post_id) references posts(id) on delete set NULL on update cascade
	
);

--user deletion trigger