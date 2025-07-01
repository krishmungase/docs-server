import express from "express";
import { DocumentController } from "../controllers/document.controller.js";
const documentRoutes = express.Router();

const documentController = new DocumentController();

documentRoutes.get(
  '/',
  (req, res, next) => documentController.getDocuments(req, res, next)
);

export default documentRoutes;