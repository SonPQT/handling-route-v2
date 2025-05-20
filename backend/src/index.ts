import express from 'express';
import cors from 'cors';
import { RequestHandler } from 'express';
import dbConnect from "./db/dbConnect";
import PostRouter from "./routes/PostRouter";

const app = express();
const port = 8080;

// Connect to database
dbConnect();

app.use(cors());
app.use(express.json());

// Mock users data - in a real app, this would be in a database
const users = {
  admin: {
    username: 'admin',
    password: '123' // In a real app, this would be hashed
  }
};

const login: RequestHandler = (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  const user = users[username as keyof typeof users];
  
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