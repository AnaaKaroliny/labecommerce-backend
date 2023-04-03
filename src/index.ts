import { users, product, purchase } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TUser, TProduct, TPurchase, PRODUCT_TYPE } from "../src/types/types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// getAllProducts

app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(product);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error);
  }
});

// getAllUsers

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error);
  }
});

//geProductByName

app.get("/product/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const result = product.filter((products) =>
      products.name.toLowerCase().includes(q.toLowerCase())
    );

    if (q !== undefined) {
      if (q.length < 2) {
        res
          .status(400)
          .send("O Query params deve ter no mínimo 2 caracteres!!");

        throw new Error("O Query params deve ter no mínimo 2 caracteres!!");
      }
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error);
  }
});

// getProductById

app.get("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = product.find((products) => products.id === id);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao encontrar produto!!");
  }
});

//getPurchaseByUserid
//FUNCIONA??

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const result = purchase.find((item) => item.userId === userId);

  res.status(200).send(result);
});

//POST Product

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, category }: TProduct = req.body;

    const newProduct = {
      id,
      name,
      price,
      category,
    };

    product.push(newProduct);
    console.log(product);

    res.status(201).send("Produto inserido com sucesso");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao criar produto!!");
  }
});

//POST create user

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password }: TUser = req.body;

    const newUser = {
      id,
      email,
      password,
    };

    users.push(newUser);

    // if (newUser !== undefined) {
    //   if ( users[id] === true) {
    //     res.status(400).send("'id' já existente.");
    //   }

    //   if (newUser !== undefined) {
    //     if (email === email) {
    //       res.status(400).send("'email' já cadastrado.");
    //       throw new Error("'email' já existente.");
    //     }
    //   }
    // }
    res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro na criação de usuário!!");
  }
});

//POST create purchase

app.post("/purchase", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice }: TPurchase = req.body;

    const newPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    purchase.push(newPurchase);

    res.status(201).send("Compra realizada com sucesso!!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao gerar purchase!!");
  }
});

//PUT user by id

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const newEmail = req.body.newEmail;
    const newPassword = req.body.newPassword;

    const findUser = users.find((item) => item.id === id);

    if (findUser !== undefined) {
      findUser.email = newEmail || findUser.email;
    }

    if (findUser !== undefined) {
      findUser.password = newPassword || findUser.password;
    }

    console.log(findUser);

    if (newEmail !== undefined) {
      if (newEmail.length < 2) {
        res.status(400);
        throw new Error("O email deve ter no mínimo 2 caracteres!!");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("A Senha deve ser do tipo string!!");
      }
    }

    res.status(200).send("Atualização realizada com sucesso");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro na atualizção!!");
  }
});

//PUT product by id

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const newName = req.body.newName;
    const newPrice = req.body.newPrice;
    const newCategory = req.body.newCategory;

    const findProduct = product.find((item) => item.id === id);

    if (findProduct !== undefined) {
      findProduct.name = newName || findProduct.name;
    }

    if (findProduct !== undefined) {
      findProduct.price = newPrice || findProduct.price;
    }

    if (findProduct !== undefined) {
      findProduct.category = newCategory || findProduct.category;
    }

    console.log(findProduct);

    if (newName !== undefined) {
      if (newName.length < 2) {
        res.status(400);
        throw new Error("O nome deve ter no mínimo 2 caracteres!!");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("O preço deve ser do tipo number!!");
      }
    }

    if (newCategory !== undefined) {
      if (
        newCategory !== PRODUCT_TYPE.COURSE &&
        newCategory !== PRODUCT_TYPE.PRODUCT &&
        newCategory !== PRODUCT_TYPE.SERVICE
      ) {
        res.status(400);
        throw new Error(
          "'Category' deve ser um tipo válido: Curso, produto ou serviço"
        );
      }
    }

    res.status(200).send("Atualização realizada com sucesso");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro na atualização!!");
  }
});

//DELETE user by id

app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const index: number = users.findIndex((user) => user.id === id);

    users.splice(index, 1);
    console.log(users);

    res.status(200).send("Usuário apagado com sucesso!!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao deletar usuário!!");
  }
});

//DELETE product by id

app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const index: number = product.findIndex((item) => item.id === id);

    users.splice(index, 1);
    console.log(product);

    res.status(200).send("Produto apagado com sucesso!!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao deletar produto!!");
  }
});
