import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	isAdmin: {
	    type: Boolean,
	    protect: true,
	    default: false
	}
});

mongoose.connect("mongodb://appuser:password123@localhost:27017/test_db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Connected successfully to DB!");
})

// compile Schema to Model
const User = mongoose.model("User", userSchema);

// export Model
export default User;