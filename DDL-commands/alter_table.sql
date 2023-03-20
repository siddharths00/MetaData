--users
alter table users drop account_id;
alter table users drop profile_image_url;
alter table users add constraint u1 check(creation_date<=last_access_date);

--posts
alter table posts drop content_license;
alter table posts add constraint p1 foreign key(owner_user_id) references users(id) on update cascade;
alter table posts add constraint p2 foreign key(last_editor_user_id) references users(id) on update cascade;
alter table posts add constraint p3 foreign key(parent_id) references posts(id) on delete cascade on update cascade;
alter table posts add constraint p4 foreign key(accepted_answer_id) references posts(id) on delete set NULL on update cascade;
alter table posts add constraint p5 check(post_type_id>=1 and post_type_id<=8);

--postlinks
alter table post_links add constraint pl1 foreign key(related_post_id) references posts(id) on delete cascade on update cascade;
alter table post_links add constraint pl2 foreign key(post_id) references posts(id) on delete cascade on update cascade;
alter table post_links add constraint pl3 check(link_type_id in (1,3));

--posthistory
alter table post_history drop revision_guid;
alter table post_history drop content_license;
alter table post_history add constraint ph1 foreign key(post_id) references posts(id) on delete cascade on update cascade;
alter table post_history add constraint ph2 foreign key(user_id) references users(id) on update cascade;

--comments
alter table comments drop content_license;
alter table comments add constraint c1 foreign key(post_id) references posts(id) on delete cascade on update cascade;
alter table comments add constraint c2 foreign key(user_id) references users(id) on update cascade;

--votes
alter table votes drop bounty_amount;
alter table votes add constraint v1 foreign key(user_id) references users(id) on delete set NULL on update cascade;
alter table votes add constraint v2 foreign key(post_id) references posts(id) on delete cascade on update cascade;

--badges
alter table badges add constraint b1 check(class in (1,2,3));
alter table badges add constraint b2 foreign key(user_id) references users(id) on delete cascade on update cascade;

--tags
alter table tags add constraint t1 foreign key(excerpt_post_id) references posts(id) on delete set NULL on update cascade;
alter table tags add constraint t2 foreign key(wiki_post_id) references posts(id) on delete set NULL on update cascade;

--user-deletion triggers must be added