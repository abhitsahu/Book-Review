const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./routes/authRoutes")
const Books = require("./routes/bookRoutes")
const reviewRoutes = require('./routes/reviewRoutes'); // Import review routes

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
    "https://mern-todo-project-bna7.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).send("Preflight Passed");
    }

    console.log("Incoming request from:", req.headers.origin);
    next();
});

app.get("/",(req,res) => {
    res.send("hey")
})

app.use("/users", User);
app.use("/books", Books);
app.use('/reviews', reviewRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
