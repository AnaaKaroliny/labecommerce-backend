"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.users = void 0;
exports.users = [
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
exports.product = [
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
exports.purchase = [
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
//# sourceMappingURL=database.js.map