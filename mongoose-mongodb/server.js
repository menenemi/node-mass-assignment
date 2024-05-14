import express from "express";
import User from "./models/newUser";
import _ from "underscore";
import UserDTO from "./models/UserDTO";

const app = express();
const port = 3000;

app.use(express.json()); // POSTされたデータをjsonとして解析し、req.bodyに格納する

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser.length > 0) {
        // when email already exists
        return res.status(403).send("User registration failed");
    }

    //const user = new User(req.body);
    const user = new User(new UserDTO(req.body));

    try {
        await user.save();
        const userFromDb = await User.find();
        res.send(userFromDb);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})