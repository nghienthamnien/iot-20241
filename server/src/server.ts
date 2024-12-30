import express from "express";
import "./broker/mqtt";
import { createUser, login } from "./controller/login";
import "./cron";
import { clineData, fromControlEsp32 } from "./broker/subscribe";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/iot");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
clineData();
fromControlEsp32();
app.post("/login", login);
app.post("/register", createUser);

app.listen(8080);
