# DB設計

## messagesテーブル
|Column|Type|Options|
|--------|-------|-------------|
|body|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル
|Column|Type|Options|
|--------|-------|-------------|
|name|string|null: false|

### Association
- has_many :users, through: :group_user
- has_many :messages
- has_many :group_user


## group_userテーブル
|Column|Type|Options|
|--------|-------|-------------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル
|Column|Type|Options|
|--------|-------|-------------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, through: :group_user
- has_many :messages
- has_many :group_user
