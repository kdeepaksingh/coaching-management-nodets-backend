import express, { type Application, type Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import appLoger from "./middleware/appLoger.js";
import { setupSwagger } from "./config/swagger.js";
import userRouter from "./routes/user-router.js";
// Load environment variables from.env file
dotenv.config();

// Connect to MongoDB
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app initialization
const app: Application = express();

// App Configuration
const hostName: string = String(process.env.HOSTNAME);
const port: number = Number(process.env.PORT) || 5000;

app.use(cookieParser());
// Middleware to parse JSON request bodies
app.use(cors()); // it is used for enabling CORS (Cross-Origin Resource Sharing) for cross-origin requests
// Allow all origins (for development)
// app.use(cors());

// OR allow specific origin (more secure)
// app.use(
//   cors({
//     origin: "http://localhost:5174", // your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // if you're using cookies or auth headers
//   })
// );
app.use(express.json()); // it is used for parsing JSON request bodies from express
app.use(express.urlencoded({ extended: true })); // it is used for parsing JSON request bodies from express
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(appLoger); // it is used for logging, its a custom logger middleware
app.use(morgan("dev")); // it is used for logging, its a third party library middleware

// Routes Adding below
app.use("/api/auth", userRouter);

setupSwagger(app as Express);
app.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
