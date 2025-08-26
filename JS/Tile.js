export class Tile {
    constructor(posicao) {
        this.posicao = posicao;
        this.valor = "";
        this.estado = "disponivel";
    }

    getPosicao() {
        return this.posicao;
    }

    getValor() {
        return this.valor;
    }

    getEstado() {
        return this.estado;
    }

    setValor(valor) {
        if (valor === "X" || valor === "O") {
            this.valor = valor;
            this.estado = "marcado";
        }
    }
}