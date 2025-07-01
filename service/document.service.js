import { DocumentModel } from "../models/index.js"

class DocumentService {
  constructor() {
    this.documentModel = DocumentModel;
  }

  async getAllDocuments() {
    return this.documentModel.find({})
  }
}


export default DocumentService