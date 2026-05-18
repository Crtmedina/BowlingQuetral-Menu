import mongoose, { InferSchemaType, Model } from "mongoose";

const menuHubSchema = new mongoose.Schema(
  {
    /** Bloque de la carta (ej. paraPicar, cocteleria) */
    slug: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    suffix: { type: String, default: "", trim: true },
    menuGroup: { type: String, required: true, enum: ["comida", "barra"] },
    iconKey: { type: String, required: true, default: "Sparkles", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    /** Un solo bloque puede usar el layout “promo / Happy Hour” en la carta. */
    isPromoHub: { type: Boolean, default: false },
    /** Bloque que aparece primero en la carta (navbar / menú) y con mayor énfasis visual. */
    isFeatured: { type: Boolean, default: false },
    /** Orden relativo solo entre bloques con `isFeatured` (0 = primero entre destacados). */
    featuredOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

menuHubSchema.index({ order: 1, slug: 1 });
menuHubSchema.index({ isFeatured: 1, featuredOrder: 1, slug: 1 });

export type MenuHub = InferSchemaType<typeof menuHubSchema> & {
  _id: mongoose.Types.ObjectId;
};

const MenuHubModel: Model<MenuHub> =
  mongoose.models.MenuHub ?? mongoose.model<MenuHub>("MenuHub", menuHubSchema);

export default MenuHubModel;
