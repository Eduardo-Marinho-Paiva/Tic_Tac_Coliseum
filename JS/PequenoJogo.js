import { Tile } from "./Tile.js";
import { verificarVitoriaGenerico } from "./utils.js";

export class PequenoJogo {
    constructor() {
        this.completo = false;
        this.posicao = null;
        this.vencedor = "Ainda não há vencedores";
        this.tiles = Array.from({ length: 9 }, (_, i) => new Tile(i + 1));
    }

    getCompleto() {
        return this.completo;
    }

    getPosicao() {
        return this.posicao;
    }

    getVencedor() {
        if (this.completo) {
            return this.vencedor;
        }
        return "Ainda não há vencedores";
    }

    getTile(index) {
        return this.tiles[index];
    }

    setCompleto() {
        this.completo = true;
    }

    setVencedor(vencedor) {
        this.vencedor = vencedor;
    }

    verificarVitoria() {
        const resultado = verificarVitoriaGenerico(this.tiles, tile => tile.getValor());
        
        let status_vitoria = resultado.vitoria;
        let vencedor_atual = resultado.vencedor;

        if (status_vitoria) {
            this.completo = true;
            this.vencedor = vencedor_atual;
        }

        if (this.tiles.every(tile => tile.getEstado() === "marcado") && !status_vitoria) {
            status_vitoria = true;
            vencedor_atual = "V";
            this.completo = true;
            this.vencedor = "T";
        }
        
        return { vitoria: status_vitoria, vencedor: vencedor_atual };
    }
}