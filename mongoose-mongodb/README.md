# mongoose-mongodb
### 動かし方
To install dependencies:

```bash
bun install
```

To run:

```bash
docker-compose up -d
```

```bash
bun run server.js
```
VSCode Rest Client Extensionを使用して`test.http`からrequestを投げて検証する。

### 後始末
To remove:
    
```bash
docker-compose down
```

To remove all:

```bash
docker-compose down --rmi all
```


### Debug
mongoDBに接続する:
```bash
docker exec -it mongoose-mongodb mongosh -u root -p
```

## Mitigation
### 方法 1
ユーザーが操作できるobjectにそもそもisAdminなどのsensitive fieldを含めない設計にする
```js:newUser.js
const userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
});
```
### 方法 2
underscore libraryを用いてPOST requestで受け付けるfieldを制限する
```js:server.js
const user = new User(_.pick(req.body, "first_name", "last_name", "email", "password"));
```