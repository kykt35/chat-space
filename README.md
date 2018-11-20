# DB設計

## messagesテーブル
|--------|-------|-------------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル
|Column|Type|Options|
|--------|-------|-------------|
|name|string|null: false|
|message_id|integer|null: false, foreign_key: true|
|member_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :members
- has_many :messages


## membersテーブル
|Column|Type|Options|
|--------|-------|-------------|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true, index: true|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル
|Column|Type|Options|
|--------|-------|-------------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true, index: true|
|password|string|null: false|
|member_id|integer|foreign_key: true|

### Association
- has_many :groups, through: :members
- has_many :messages
