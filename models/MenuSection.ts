import mongoose, { InferSchemaType, Model } from "mongoose";

const menuSectionSchema = new mongoose.Schema(
  {
    /** Categoría del menú (slug único); los productos referencian este valor en sectionId */
    slug: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    /** Bloque (ej. paraPicar) al que pertenece esta categoría */
    hubSlug: { type: String, required: true, trim: true },
    intro: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuSectionSchema.index({ hubSlug: 1, order: 1, slug: 1 });

export type MenuSection = InferSchemaType<typeof menuSectionSchema> & {
  _id: mongoose.Types.ObjectId;
};

const MenuSectionModel: Model<MenuSection> =
  mongoose.models.MenuSection ?? mongoose.model<MenuSection>("MenuSection", menuSectionSchema);

export default MenuSectionModel;
