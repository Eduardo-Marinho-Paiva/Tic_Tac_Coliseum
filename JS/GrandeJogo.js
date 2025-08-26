import { PequenoJogo } from './PequenoJogo.js';
import { verificarVitoriaGenerico } from "./utils.js";

export class GrandeJogo {
    constructor() {
        this.completo = false;
        this.jogos = Array.from({ length: 9 }, () => (new PequenoJogo()));
    }

    getCompleto() {
        return this.completo;
    }

    getJogo(index) {
        return this.jogos[index];
    }

    setCompleto() {
        this.completo = true;
    }

    verificarVitoria() {
        const resultado = verificarVitoriaGenerico(this.jogos, jogo => jogo.getVencedor());
        
        let status_vitoria = resultado.vitoria;
        let vencedor_atual = resultado.vencedor;

        if (status_vitoria) {
            this.completo = true;
        }

        if (this.jogos.every(jogo => jogo.getCompleto()) && !status_vitoria) {
            status_vitoria = true;
            vencedor_atual = "V";
        }

        return { vitoria: status_vitoria, vencedor: vencedor_atual };
    }
}