"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnect = require("./db/dbConnect");
const PostRouter = require("./routes/PostRouter");
const app = (0, express_1.default)();
const port = 8080;
// Connect to database
dbConnect();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mock users data - in a real app, this would be in a database
const users = {
    admin: {
        username: 'admin',
        password: '123' // In a real app, this would be hashed
    }
};
const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }
    const user = users[username];
    if (!user || user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    res.json({
        username: user.username,
        token: 'mock-jwt-token' // In a real app, this would be a proper JWT
    });
};
app.post('/api/login', login);
app.use("/api", PostRouter);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
