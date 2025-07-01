import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DocumentModel = mongoose.model("Document", documentSchema);
export default DocumentModel;
