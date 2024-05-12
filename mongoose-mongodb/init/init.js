db = db.getSiblingDB("test_db");
db.createCollection("users");
db.createUser({user:"appuser", pwd:"password123", roles:[{ role:"readWrite", db: "test_db"}]});