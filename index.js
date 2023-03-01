//1
console.log("O aplicativo foi iniciado");

//2
const nome = process.argv[2];
console.log(nome);

//3

const { pedra, papel, tesoura } = process.argv[2];
const lance = ["pedra", "papel", "tesoura"];

const computador = lance[Math.floor(Math.random() * 3)];

console.log("dev escolheu = " + process.argv[2]);
console.log("computador escolheu = " + computador);

if (process.argv[2] === computador) {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Empate`
  );
} else if (process.argv[2] === "pedra" && computador === "papel") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Computador ganhou!`
  );
} else if (process.argv[2] === "pedra" && computador === "tesoura") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Você ganhou!`
  );
} else if (process.argv[2] === "papel" && computador === "pedra") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Você ganhou!`
  );
} else if (process.argv[2] === "papel" && computador === "tesoura") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Computador ganhou!`
  );
} else if (process.argv[2] === "tesoura" && computador === "papel") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Você ganhou!`
  );
} else if (process.argv[2] === "tesoura" && computador === "pedra") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Computador ganhou!`
  );
} else {
  console.log("não entendi!!");
}
