import { DocumentModel } from "../models/index.js"

class DocumentService {
  constructor() {
    this.documentModel = DocumentModel;
  }

  async getAllDocuments() {
    return this.documentModel.find({})
  }

  async createDocument(document, userId) {
    return this.documentModel.create({ ...document, ownerId: userId });
  }

}


export default DocumentService