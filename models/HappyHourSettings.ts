import mongoose, { InferSchemaType, Model } from "mongoose";

/**
 * Configuración global de Happy Hour (un solo documento recomendado).
 * Días: 0 = domingo … 6 = sábado (formato JS Date.getDay()).
 */
const happyHourSchema = new mongoose.Schema(
  {
    /** Documento singleton: usar _id fijo o buscar el primero */
    label: { type: String, default: "Happy Hour", trim: true },
    enabled: { type: Boolean, default: false },
    daysOfWeek: [{ type: Number, min: 0, max: 6 }],
    /** "HH:mm" en zona horaria del local (definir TZ en env si hace falta) */
    startTime: { type: String, default: "18:00", trim: true },
    endTime: { type: String, default: "21:00", trim: true },
    /** Texto legal o descripción de la promo (ej. 2x1 en tragos marcados) */
    promoDescription: { type: String, default: "", trim: true },
    /** Si está vacío, aplican todos los productos con happyHour2x1: true */
    applicableProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export type HappyHourSettings = InferSchemaType<typeof happyHourSchema> & {
  _id: mongoose.Types.ObjectId;
};

const HappyHourSettingsModel: Model<HappyHourSettings> =
  mongoose.models.HappyHourSettings ??
  mongoose.model<HappyHourSettings>("HappyHourSettings", happyHourSchema);

export default HappyHourSettingsModel;
