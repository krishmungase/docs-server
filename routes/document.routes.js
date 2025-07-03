import express from "express";
import { DocumentController } from "../controllers/document.controller.js";
import authenticateJWT from "../middleware/authenticateJwt.js";
const documentRoutes = express.Router();

const documentController = new DocumentController();

documentRoutes.get(
  '/',
  (req, res, next) => documentController.getDocuments(req, res, next)
);

documentRoutes.post(
  '/',
  authenticateJWT,
  (req, res, next) => documentController.createDocument(req, res, next)
)

export default documentRoutes;