import mongoose, { InferSchemaType, Model } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    /** URL de imagen de portada (Cloudinary u otro CDN) */
    coverImage: { type: String, trim: true },
    /** Orden en tabs / listado público */
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ order: 1, name: 1 });

export type Category = InferSchemaType<typeof categorySchema> & {
  _id: mongoose.Types.ObjectId;
};

const CategoryModel: Model<Category> =
  mongoose.models.Category ?? mongoose.model<Category>("Category", categorySchema);

export default CategoryModel;
