import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { generateWebsite, getWebsiteByID } from "../controllers/website.controllers.js";

const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite)
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteByID)

export default websiteRouter
