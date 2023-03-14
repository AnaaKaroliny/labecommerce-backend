import { users, product, purchase } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TUser, TProduct, TPurchase } from "../src/types/types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// getAllProducts

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(product);
});

// getAllUsers

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

//getCourseByName
app.get("/product/search", (req: Request, res: Response) => {
  const q = req.query.q as string;

  const result = product.filter((products) =>
    products.name.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).send(result);
});

//POST Product

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, category }: TProduct = req.body;

  const newProduct = {
    id,
    name,
    price,
    category,
  };

  product.push(newProduct);

  res.status(201).send("Produto inserido com sucesso");
});

//POST create user

app.post("/users", (req: Request, res: Response) => {
  const { id, email, password }: TUser = req.body;

  const newUser = {
    id,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).send("Usuário criado com sucesso");
});

//POST create purchase

app.post("/purchase", (req: Request, res: Response) => {
  const { userId, productId, quantity, totalPrice }: TPurchase = req.body;

  const newPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,
  };

  purchase.push(newPurchase);

  res.status(201).send("Purchase feito!!");
});
