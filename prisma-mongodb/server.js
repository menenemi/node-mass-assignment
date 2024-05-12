import express from "express";
import { PrismaClient } from "@prisma/client";
import _ from "underscore";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
    try {
        const user = await prisma.user.create({ data: req.body });
        const allUsers = await prisma.user.findMany();
        console.log(allUsers);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})