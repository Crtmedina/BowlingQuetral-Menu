import mongoose, { InferSchemaType, Model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    price: { type: String, required: true, trim: true },
    deal: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    /** Slug de categoría del menú (bloque → categoría → productos) */
    sectionId: {
      type: String,
      required: true,
      trim: true,
    },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }],
    showOnHome: { type: Boolean, default: false },
    isDailyOffer: { type: Boolean, default: false },
    isNovelty: { type: Boolean, default: false },
    happyHour2x1: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ sectionId: 1, order: 1, name: 1 });
productSchema.index({ showOnHome: 1, active: 1 });

export type Product = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
};

const ProductModel: Model<Product> =
  mongoose.models.Product ?? mongoose.model<Product>("Product", productSchema);

export default ProductModel;
