export default function Tile(posicao) {
    this.posicao = posicao;       // número de 1 a 9
    this.valor = "";              // "X", "O" ou vazio
    this.estado = "disponivel";   // "disponivel" ou "marcado"
}

// Getters
Tile.prototype.getPosicao = function () {
    return this.posicao;
};

Tile.prototype.getValor = function () {
    return this.valor;
};

Tile.prototype.getEstado = function () {
    return this.estado;
};

// Setter
Tile.prototype.setValor = function (valor) {
    if (valor === "X" || valor === "O") {
        this.valor = valor;
        this.estado = "marcado";
    } else {
        console.warn("Valor inválido para o tile:", valor);
    }
};
