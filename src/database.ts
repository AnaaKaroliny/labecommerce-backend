import { PRODUCT_TYPE, TProduct, TPurchase, TUser } from "./types/types";

export const users: TUser[] = [
  {
    id: "a001",
    email: "karol@user.com",
    password: "k@rolAstrod3v",
  },
  {
    id: "a002",
    email: "anderson@user.com",
    password: "dersonAstrod3v",
  },
  {
    id: "a003",
    email: "juliana@user.com",
    password: "julyAstrod3v",
  },
];

export const product: TProduct[] = [
  {
    id: "p001",
    name: "Análise de Coloração Pessoal",
    price: 500,
    category: PRODUCT_TYPE.SERVICE,
  },
  {
    id: "p002",
    name: "Personal Shopper",
    price: 1500,
    category: PRODUCT_TYPE.SERVICE,
  },
  {
    id: "p003",
    name: "Curso do Sistema Kibbe",
    price: 500,
    category: PRODUCT_TYPE.COURSE,
  },
];

export const purchase: TPurchase[] = [
  {
    userId: "a001",
    productId: "p001",
    quantity: 1,
    totalPrice: 500,
  },
  {
    userId: "a002",
    productId: "p002",
    quantity: 1,
    totalPrice: 1500,
  },
];
