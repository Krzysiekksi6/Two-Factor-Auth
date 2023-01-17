const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const { Novu } = require("@novu/node");

const novu = new Novu("966a4245fa3f4e36c66378e92e7b7abc");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [];
let code;

const generateID = () => Math.random().toString(36).substring(2, 10);
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
    try {
        let response = await novu.trigger("sendsms", {
            to: {
                subscriberId: recipient,
                phone: recipient,
            },
            payload: {
                code: verificationCode,
            },
        });
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    let result = users.filter(
        (user) => user.email === email && user.password === password
    );

    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    code = generateCode();

    sendNovuNotification(result[0].tel, code);

    res.json({
        message: "Login successfully",
        data: {
            username: result[0].username,
        },
    });
});


app.post("/api/register", (req, res) => {
    const { email, password, tel, username } = req.body;
    let result = users.filter((user) => user.email === email || user.tel === tel);
    if (result.length === 0) {
        const newUser = { id: generateID(), email, password, username, tel };
        users.push(newUser);
        return res.json({
            message: "Account created successfully!",
        });
    }
    res.json({
        error_message: "User already exists",
    });
});

app.post("/api/verification", (req, res) => {
    if (code === req.body.code) {
        return res.json({ message: "You're verified successfully" });
    }
    res.json({
        error_message: "Incorrect credentials",
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
