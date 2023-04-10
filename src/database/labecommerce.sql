-- Active: 1679966339233@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT NOT NULL UNIQUE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

DROP Table users;

INSERT INTO users (id, email, password)
VALUES
("U001", "karol@user.com", "k@rolAstrod3v"),
("U002", "anderson@user.com", "dersonAstrod3v"),
("U003", "juliana@user.com", "julyAstrod3v");

INSERT INTO users (id, email, password)
VALUES
("U004", "laisregina@user.com", "laisAstrod3v");

CREATE TABLE products (
  id TEXT NOT NULL UNIQUE PRIMARY KEY, 
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);

DROP Table products;

INSERT INTO products (id, name, price, category)
VALUES
("G001", "Análise de Coloração Pessoal", 500, "Serviço"),
("G002", "Personal Shopper", 1500, "Serviço"),
("G003", "Curso do Sistema Kibbe", 500, "Curso"),
("G004", "Curso de Automaquiagem", 1000, "Curso"),
("G005", "Kit Skin Care", 200, "Produto"),
("G006", "Workshop a Chave do Estilo", 300, "Serviço")
;

INSERT INTO products (id, name, price, category)
VALUES
("G007", "Paleta de Sombra By Mari Maria Makeup", 150, "Produto");

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name = "Personal Shopper";

SELECT * FROM users 
ORDER BY "email" ASC;

SELECT * FROM products
ORDER BY "price" ASC
LIMIT 20 OFFSET 0;

SELECT * FROM products
WHERE price >= 150
AND price < 300
ORDER BY "price" ASC; 

CREATE Table purchase (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL NOT NULL,
paid INTEGER NOT NULL,
delivered_at TEXT,
buyer_id TEXT NOT NULL, 
FOREIGN KEY (buyer_id) REFERENCES users(id)
);

SELECT * FROM purchase; 

DROP Table purchase;

INSERT INTO purchase 
VALUES 
("P001", "500", 0, NULL, "U001" ),
("P002", "1500", 1, NULL, "U002" ),
("P003", "3500", 1, "25-04-2023", "U002"),
("P004", "5500", 0, "12-08-2023", "U003" );

UPDATE purchase 
SET delivered_at = '09-04-2023'
WHERE id = "P003";

SELECT purchase.id, purchase.total_price, purchase.paid, purchase.delivered_at, users.id, users.email
FROM purchase
INNER JOIN users 
ON purchase.buyer_id = users.id
WHERE users.id = "U002" 
ORDER BY purchase.delivered_at DESC;


CREATE Table purchases_products (
purchase_id TEXT NOT NULL,
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
FOREIGN KEY (purchase_id) REFERENCES purchase(id),
FOREIGN KEY (product_id) REFERENCES products(id)

);

SELECT * FROM purchases_products;

INSERT INTO purchases_products 
VALUES 
("P001", "G003", 5 ),
("P002", "G001", 3 ),
("P003", "G002", 1 ),
("P004", "G005", 4 )
;

--Todos os dados da compra
SELECT * FROM purchases_products
INNER JOIN products ON purchases_products.product_id = products.id
INNER JOIN purchase ON purchases_products.purchase_id = purchase.id
INNER JOIN users ON purchase.buyer_id = users.id
WHERE users.id = "U002" --se não usar o where seleciona tudo de todos os usuários
;