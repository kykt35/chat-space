# DB設計

## messagesテーブル
|--------|-------|-------------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## groupsテーブル
|Column|Type|Options|
|--------|-------|-------------|
|name|string|null: false|
|message_id|integer|null: false, foreign_key: true|
|member_id|integer|null: false, foreign_key: true|

## membersテーブル


## usersテーブル
