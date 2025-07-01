import logger from "../config/logger.js";
import {
  DocumentService
} from "../service/index.js"

export class DocumentController {
  constructor() {
    this.logger = logger
    this.documentService = new DocumentService()
  }

  async getDocuments(req, res, next) {
    const documents = await this.documentService.getAllDocuments()
    return res.json({ message: { documents } });
  }
}