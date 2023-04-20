-- Active: 1679966339233@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT NOT NULL UNIQUE PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP Table users;

INSERT INTO users (id, name, email, password)
VALUES
("U001", "Ana Karoliny","karol@user.com", "k@rolAstrod3v"),
("U002", "Anderson Marques", "anderson@user.com", "dersonAstrod3v"),
("U003", "Juliana Félix", "juliana@user.com", "julyAstrod3v");

INSERT INTO users (id, name, email, password)
VALUES
("U004", "Laís Regina", "laisregina@user.com", "laisAstrod3v");

CREATE TABLE products (
  id TEXT NOT NULL UNIQUE PRIMARY KEY, 
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT
);

DROP Table products;

INSERT INTO products (id, name, price, description, imageUrl)
VALUES
("G001", "Análise de Coloração Pessoal", 500, "Serviço", "https://www.unifor.br/documents/20143/0/ColoracaoPessoal-800-Getty.jpg/c980e093-8345-6324-4bdd-b4f2c8633f81?t=1634672467096"),
("G002", "Personal Shopper", 1500, "Serviço", "https://res.cloudinary.com/ecole-brasil/images/v1617980727/como-ser-personal-shopper_253434dcab/como-ser-personal-shopper_253434dcab.jpg"),
("G003", "Curso de especialização Sistema Kibbe", 500, "Curso", "https://hotmart.s3.amazonaws.com/product_pictures/e646e5a1-d359-442a-8e01-c06bbf679d81/CapturadeTela20210909s125501.png" ),
("G004", "Curso de Automaquiagem", 1000, "Curso", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/538/679/products/61-a62834e487334f172716539470044284-640-0.png"),
("G005", "Kit Skin Care Dior", 200, "Produto", "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_1800,c_limit/e_trim/v1/imagens/product/69277/6f3824c4-be79-436d-918a-0f2a7044af46-dior-diorskin-capture-totale-dream-skin-care-e-perfect-serum-multifuncional-facial-30ml.png"),
("G006", "Workshop a Chave do Estilo", 300, "Serviço", "https://www.modochique.com.br/images/6cbc90ee-af46-4360-bf32-41809b2c603f.jpg")
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
buyer TEXT NOT NULL,
total_price REAL NOT NULL,
paid INTEGER NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM purchase; 

DROP Table purchase;

INSERT INTO purchase (id, buyer, total_price, paid)
VALUES 
("P001", "U001", "500", 0),
("P002", "U002", "1500", 1),
("P003", "U002", "3500", 1),
("P004", "U003", "5500", 0);

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