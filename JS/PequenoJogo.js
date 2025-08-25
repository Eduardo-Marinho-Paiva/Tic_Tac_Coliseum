// Supondo que Tile já esteja definido no escopo global
import Tile from './Tile.js'; // Adicione esta linha

export default function PequenoJogo() {
    this.completo  = false;
    this.posicao   = { x: null };                      // Mantém a propriedade, valor inicial genérico
    this.vencedor  = "Ainda não há vencedores";        // 'X', 'O', 'T' (velha) ou texto padrão
    this.tiles     = Array.from(
        { length: 9 },
        (_, i) => new Tile(i + 1)                      // Cria 9 Tiles de 1 a 9
    );
}

// Getters
PequenoJogo.prototype.getCompleto = function () {
    return this.completo;
};

PequenoJogo.prototype.getPosicao = function () {
    return this.posicao;
};

PequenoJogo.prototype.getVencedor = function () {
    if (this.completo) {
        return this.vencedor;
    }
    return "Ainda não há vencedores";
};

PequenoJogo.prototype.getTile = function (index) {
    return this.tiles[index];
};

// Setters
PequenoJogo.prototype.setCompleto = function () {
    this.completo = true;
};

PequenoJogo.prototype.setVencedor = function (v) {
    this.vencedor = v;
    this.completo = true;
};

// Lógica de jogo
PequenoJogo.prototype.verificarVitoria = function () {
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
      this.tiles[a - 1].getValor(),
      this.tiles[b - 1].getValor(),
      this.tiles[c - 1].getValor()
    ];

    if (ganhouComCoringa(trio, "X")) {
      status_vitoria = true;
      vencedor_atual = "X";
      this.vencedor = "X";
      this.completo = true;
      break;
    }

    if (ganhouComCoringa(trio, "O")) {
      status_vitoria = true;
      vencedor_atual = "O";
      this.vencedor = "O";
      this.completo = true;
      break;
    }
  }

  if (
    !status_vitoria &&
    this.tiles.every(tile => tile.getEstado() === "marcado")
  ) {
    status_vitoria = true;
    vencedor_atual = "V";
    this.vencedor = "T";
    this.completo = true;
  }

  return { vitoria: status_vitoria, vencedor: vencedor_atual };
};

