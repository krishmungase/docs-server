import mongoose from "mongoose";

const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    initialContent: {
      type: String,
      required: false,
    },
    ownerId: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: false,
    },
    organizationId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const DocumentModel = mongoose.model("Document", documentSchema);
export default DocumentModel;
