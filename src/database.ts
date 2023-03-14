import { TProduct, TPurchase, TUser } from "./types/types";

export const users: TUser[] = [
  {
    id: "01",
    email: "karol@user.com",
    password: "k@rolAstrod3v",
  },
  {
    id: "02",
    email: "anderson@user.com",
    password: "dersonAstrod3v",
  },
  {
    id: "03",
    email: "juliana@user.com",
    password: "julyAstrod3v",
  },
];

export const product: TProduct[] = [
  {
    id: "01",
    name: "Análise de Coloração Pessoal",
    price: 500,
    category: "serviços",
  },
  {
    id: "02",
    name: "Personal Shopper",
    price: 1500,
    category: "serviços",
  },
  {
    id: "01",
    name: "Curso do Sistema Kibbe",
    price: 500,
    category: "produtos",
  },
];

export const purchase: TPurchase[] = [
  {
    userId: "01",
    productId: "01",
    quantity: 1,
    totalPrice: 500,
  },
  {
    userId: "02",
    productId: "02",
    quantity: 1,
    totalPrice: 1500,
  },
];
