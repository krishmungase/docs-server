import createHttpError from "http-errors";
import logger from "../config/logger.js";
import {
  AuthService,
  DocumentService
} from "../service/index.js"

export class DocumentController {
  constructor() {
    this.logger = logger
    this.documentService = new DocumentService()
    this.authService = new AuthService()
  }

  async getDocuments(req, res, next) {
    const documents = await this.documentService.getAllDocuments()
    return res.json({ message: { documents } });
  }

  async createDocument(req, res, next) {
    const document = req.body;
    const userId = req.userId;

    const user = await this.authService.findUserById(userId);
    if (!user) return next(createHttpError(401, "Unauthorized"));

    const newDocument = await this.documentService.createDocument(document, userId);

    return res.json({ message: { document: newDocument } });
  }
}