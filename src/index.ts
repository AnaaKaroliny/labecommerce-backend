import { users, product, purchase } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";

import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// getAllUsers

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM users`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getAllProducts

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM products`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// getAllPurchase

app.get("/purchase", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM purchase`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//getProductByName

app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const result = await db.raw(`
    SELECT * FROM products 
    WHERE name 
    LIKE "${"%" + q + "%"}"`);

    if (q !== undefined) {
      if (q.length < 2) {
        res
          .status(400)
          .send("O Query params deve ter no mínimo 2 caracteres!!");
        throw new Error("O Query params deve ter no mínimo 2 caracteres!!");
      }
    }

    res.status(200).json({ products: result[0] });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(error);
  }
});

//getPurchaseById

app.get("/purchase/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const purchaseResult = await db.raw(`
      SELECT purchase.id as purchaseId, purchase.total_price as totalPrice, purchase.paid, 
        users.id as buyerId, users.name as buyerName, users.email as buyerEmail,
        products.id as productId, products.name as productName, products.price as productPrice, 
        products.description as productDescription, products.imageUrl as productImageUrl, 
        purchases_products.quantity as productQuantity
      FROM purchase
      INNER JOIN users ON purchase.buyer = users.id
      INNER JOIN purchases_products ON purchase.id = purchases_products.purchase_id
      INNER JOIN products ON purchases_products.product_id = products.id
      WHERE purchase.id = "${id}"
    `);
    console.log(purchaseResult);
    if (purchaseResult.length === 0) {
      res.status(404).send("Compra não encontrada");
      return;
    }

    const purchase = {
      purchaseId: purchaseResult[0].purchaseId,
      buyerId: purchaseResult[0].buyerId,
      buyerName: purchaseResult[0].buyerName,
      buyerEmail: purchaseResult[0].buyerEmail,
      totalPrice: purchaseResult[0].totalPrice,
      createdAt: purchaseResult[0].createdAt,
      paid: purchaseResult[0].paid,

      products: purchaseResult.map((row: any) => ({
        id: row.productId,
        name: row.productName,
        price: row.productPrice,
        description: row.productDescription,
        imageUrl: row.productImageUrl,
        quantity: row.productQuantity,
      })),
    };

    res.status(200).json(purchase);
  } catch (error) {
    console.log(error);

    res.status(500).send("Erro ao buscar compra");
  }
});

//getPurchaseByUserid

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;

    const purchasesResult = await db.raw(`
      SELECT purchase.id as purchaseId, purchase.total_price as totalPrice, purchase.paid, 
        users.id as buyerId, users.name as buyerName, users.email as buyerEmail
      FROM purchase
      INNER JOIN users ON purchase.buyer = users.id
      WHERE buyer = "${userId}"
    `);

    const purchases = purchasesResult.map((row: any) => ({
      purchaseId: row.purchaseId,
      buyerId: row.buyerId,
      buyerName: row.buyerName,
      buyerEmail: row.buyerEmail,
      totalPrice: row.totalPrice,
      createdAt: row.createdAt,
      paid: row.paid,
    }));

    res.status(200).json(purchases);
  } catch (error) {
    console.log(error);

    res.status(500).send("Erro ao buscar compras");
  }
});

//POST Product

app.post("/products", async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const price: number = req.body.price;
    const description: string = req.body.description;
    const imageUrl: string = req.body.imageUrl;

    await db.raw(`
    INSERT INTO products (id, name, price, description, imageUrl)
    VALUES ("${id}","${name}", "${price}", "${description}", "${imageUrl}");
    `);

    res.status(201).send({ message: "Produto inserido com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao criar produto!!");
  }
});

//POST User

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    await db.raw(`
        INSERT INTO users (id, name, email, password )
        VALUES ("${id}","${name}", "${email}", "${password}");
    `);

    res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro na criação de usuário!!");
  }
});

//POST Purchase

app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const buyer = req.body.buyer;
    const totalPrice = req.body.totalPrice;
    const paid = req.body.paid;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;

    const purchase_id = Math.floor(Date.now() * Math.random()).toString(36);
    console.log(buyer, totalPrice, paid, product_id, quantity);
    await db.raw(`
        INSERT INTO purchase (id, buyer, total_price, paid )
        VALUES ('${purchase_id}','${buyer}', ${totalPrice}, ${paid});
    `);

    await db.raw(`
        INSERT INTO purchases_products (purchase_id, product_id, quantity )
        VALUES ('${purchase_id}', '${product_id}', ${quantity});
    `);

    res.status(201).send("Pedido realizado com sucesso!!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro ao gerar compra!!");
  }
});

//PUT Product by id

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const newName: string = req.body.newName;
    const newPrice: number = req.body.newPrice;
    const newDescription: string = req.body.newDescription;
    const newImageUrl: string = req.body.newImageUrl;

    const productToUpdate = await db("products").where({ id: id });

    if (productToUpdate.length === 0) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

    const updateData: Record<string, any> = {};

    if (newName !== undefined) {
      if (newName.length < 2) {
        res.status(400);
        throw new Error("O nome deve ter no mínimo 2 caracteres!!");
      }
      updateData.name = newName;
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("O preço deve ser do tipo number!!");
      }
      updateData.price = newPrice;
    }

    if (newDescription !== undefined) {
      if (newDescription.length < 2) {
        res.status(400);
        throw new Error("'Description' deve ter no mínimo 2 caracteres!!");
      }
      updateData.description = newDescription;
    }

    if (newImageUrl !== undefined) {
      if (newImageUrl.length < 2) {
        res.status(400);
        throw new Error("'A url' deve ter no mínimo 2 caracteres!!");
      }
      updateData.description = newDescription;
    }

    await db("products").where({ id: id }).update(updateData);

    res.status(200).send("Atualização realizada com sucesso");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("erro na atualização!!");
  }
});

//DELETE Purchase by id

app.delete("/purchase/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await db.raw(`
      DELETE FROM purchase
      WHERE id = "${id}"
    `);

    const result = await db.raw(`
      SELECT * FROM purchase
      WHERE id <> "${id}"
    `);
    const purchases = result[0];

    console.log(purchases);
    res.status(200).send("Compra apagada com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send("Erro ao deletar compra!");
  }
});
