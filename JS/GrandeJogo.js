// Supondo que PequenoJogo já esteja definido no escopo global
import PequenoJogo from './PequenoJogo.js'; // Adicione esta linha
export default function GrandeJogo() {
    this.completo = false;
    this.jogos = Array.from({ length: 9 }, () => new PequenoJogo());
}

// Getters
GrandeJogo.prototype.getCompleto = function () {
    return this.completo;
};

GrandeJogo.prototype.getJogo = function (index) {
    return this.jogos[index];
};

// Setters
GrandeJogo.prototype.setCompleto = function () {
    this.completo = true;
};

// Outros
GrandeJogo.prototype.verificarVitoria = function () {
  let status_vitoria = false;
  let vencedor_atual = "none";

  const combinacoes = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  function ganhouComCoringa(valores, jogador) {
    return (
      valores.every(v => v === jogador || v === "T") &&
      valores.some(v => v === jogador)
    );
  }

  for (const [a, b, c] of combinacoes) {
    const trio = [
      this.jogos[a - 1].getVencedor(),
      this.jogos[b - 1].getVencedor(),
      this.jogos[c - 1].getVencedor()
    ];

    if (ganhouComCoringa(trio, "X")) {
      status_vitoria = true;
      vencedor_atual = "X";
      this.completo = true;
      break;
    }

    if (ganhouComCoringa(trio, "O")) {
      status_vitoria = true;
      vencedor_atual = "O";
      this.completo = true;
      break;
    }
  }

  if (this.jogos.every(jogo => jogo.getCompleto()) && !status_vitoria) {
    status_vitoria = true;
    vencedor_atual = "V";
  }

  return { vitoria: status_vitoria, vencedor: vencedor_atual };
};
