import mongoose, { InferSchemaType, Model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    /** Precio de carta (normal) */
    price: { type: Number, required: true, min: 0 },
    /** Precio promocional / oferta (opcional) */
    offerPrice: { type: Number, min: 0 },
    imageUrl: { type: String, trim: true },
    /** false = agotado */
    stock: { type: Boolean, default: true },
    /** Etiquetas: Vegano, Picante, Sin gluten, etc. */
    tags: [{ type: String, trim: true }],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    /** Orden dentro de la categoría */
    order: { type: Number, default: 0 },
    /** Carrusel / grid de inicio (novedades + promos imperdibles) */
    showOnHome: { type: Boolean, default: false },
    /** Destacar como oferta del día en hero */
    isDailyOffer: { type: Boolean, default: false },
    /** Marca el producto como novedad */
    isNovelty: { type: Boolean, default: false },
    /** Participa en lógica 2x1 Happy Hour (ver HappyHourSettings) */
    happyHour2x1: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ categoryId: 1, order: 1 });
productSchema.index({ showOnHome: 1, stock: 1 });

export type Product = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
};

const ProductModel: Model<Product> =
  mongoose.models.Product ?? mongoose.model<Product>("Product", productSchema);

export default ProductModel;
