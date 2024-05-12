# prisma-mongodb
### 動かし方
To install dependencies:

```bash
bun install
```

To run:

```bash
docker-compose up
```
レプリカセットの初期化ができていないのでエラーで落ちる。

Initiate the MongoDB replica set.（init.jsで自動化できなかったので、手動で実行する）
```bash
docker exec -it prisma-mongodb mongosh --eval 'rs.initiate({_id:"rs0", members: [{_id:0, host: "127.0.0.1:27017"}]})'
```
この状態でもう一度動かすとちゃんと動く。
```bash
docker-compose up
```
```bash
bun run server.js
```
VSCode Rest Client Extensionを使用して`test.http`ファイルからrequestを投げて検証する。

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
docker exec -it prisma-mongodb mongosh
```

## Mitigation
### 方法 1
ユーザーが操作できるobjectにそもそもRoleなどのsensitive fieldを含めない設計にする
```prisma:schema.prisma
model User {
    id          String   @id @default(auto()) @map("_id") @db.ObjectId
    username    String
    email       String
}
```
### 方法 2
underscore libraryを用いてPOST requestで受け付けるfieldを制限する
```js:server.js
const user = await prisma.user.create({ data: _.pick(req.body, "username", "email") });
```