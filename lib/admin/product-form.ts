export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  deal: string;
  imageUrl: string;
  order: number;
  active: boolean;
  happyHour2x1: boolean;
  isNovelty: boolean;
  showOnHome: boolean;
};

export const emptyProductForm: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  deal: "",
  imageUrl: "",
  order: 0,
  active: true,
  happyHour2x1: false,
  isNovelty: false,
  showOnHome: false,
};
