import { PequenoJogo } from './PequenoJogo'; // Adjust the path as needed
export class GrandeJogo {
    private completo: boolean;
    private jogos: PequenoJogo[];

    constructor() {
        this.completo = false;
        this.jogos = Array.from({length:9},()=>(new PequenoJogo()));
    }

// Getters
    public getCompleto(): boolean {
        return this.completo;
    }

    public getJogo(index:number): PequenoJogo{
        return this.jogos[index];
    }


// Setters
    public setCompleto(): void {
        this.completo = true;
    }

    
// Others
    public verificarVitoria(): {vitoria:boolean,vencedor: string}{
        let status_vitoria = false;
        let vencedor_atual: string = "none"; // Começa como null
        // Analise Vitoria (X | O) -> Analise Velha (V) -> Sem vitória nem Velha (None)

        // Lógica de Analise de Vitoria
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

        // Verificação de Vitória 
        for (const combinacao of combinacoes) {
            const [a, b, c] = combinacao;
            // Verificação de Vitória de X
            if (
                // T = Empate -> Empate vale para X e O
                (this.jogos[a - 1].getVencedor() === "X" || this.jogos[a - 1].getVencedor() === "T") &&
                (this.jogos[b - 1].getVencedor() === "X" || this.jogos[b - 1].getVencedor() === "T") &&
                (this.jogos[c - 1].getVencedor() === "X" || this.jogos[c - 1].getVencedor() === "T")
            ) {
                status_vitoria = true;
                vencedor_atual = "X"; // Só vai sair X ou O
                this.completo = true;
                break;
            }
            // Verificação de Vitória de O
            else if (
                (this.jogos[a - 1].getVencedor() === "O" || this.jogos[a - 1].getVencedor() === "T") &&
                (this.jogos[b - 1].getVencedor() === "O" || this.jogos[b - 1].getVencedor() === "T") &&
                (this.jogos[c - 1].getVencedor() === "O" || this.jogos[c - 1].getVencedor() === "T")
            ) {
                status_vitoria = true;
                vencedor_atual = "O";
                this.completo = true;
                break;
            }
        }

        // Lógica de Velha -> Encheu o Mapa e nada de alguém vencer
        if (this.jogos.every(jogo => jogo.getCompleto()) && status_vitoria == false) {
            status_vitoria = true;
            vencedor_atual = "V";
        }

        return {vitoria: status_vitoria, vencedor: vencedor_atual };
    }
}
