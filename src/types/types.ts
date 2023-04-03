export enum PRODUCT_TYPE {
  PRODUCT = "Produto",
  SERVICE = "Serviço",
  COURSE = "Curso",
}

export type TUser = {
  id: string;
  email: string;
  password: string;
};

export type TProduct = {
  id: string;
  name: string;
  price: number;
  category: PRODUCT_TYPE;
};

export type TPurchase = {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
};
