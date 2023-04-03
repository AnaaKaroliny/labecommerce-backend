-- Active: 1679966339233@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT NOT NULL UNIQUE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
(001, "karol@user.com", "k@rolAstrod3v"),
(002, "anderson@user.com", "dersonAstrod3v"),
(003, "juliana@user.com", "julyAstrod3v");

CREATE TABLE products (
  id TEXT NOT NULL UNIQUE PRIMARY KEY, 
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT
);

DROP Table products;

INSERT INTO products (id, name, price, category)
VALUES
(001, "Análise de Coloração Pessoal", 500, "Serviço"),
(002, "Personal Shopper", 1500, "Serviço"),
(003, "Curso do Sistema Kibbe", 500, "Curso"),
(004, "Curso de Automaquiagem", 1000, "Curso"),
(005, "Kit Skin Care", 200, "Produto")
;