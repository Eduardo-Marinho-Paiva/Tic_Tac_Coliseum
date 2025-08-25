import { Tile } from "./Tile";
export class PequenoJogo {
    private completo: boolean;
    private posicao: { x: number }; // Número de 1 a 9
    private vencedor: string = "Ainda não há vencedores"; // 'X', 'O','V' ou null
    private tiles: Tile[];

    constructor() {
        this.completo = false;
        this.tiles = Array.from({ length: 9 }, (_, i) => new Tile(i + 1)); // Inicializa os tiles com posições de 1 - 9.
    }

    // Getter
    public getCompleto(): boolean {
        return this.completo;
    }

    public getPosicao(): { x: number } {
        return this.posicao;
    }

    public getVencedor(): string {
        if (this.completo) {
            return this.vencedor;
        }
        return "Ainda não há vencedores";
    }

    public getTile(index: number): Tile {
        return this.tiles[index];
    }

    // Setters
    public setCompleto(): void {
        this.completo = true;
    }
    public setVencedor(vencedor: string): void {
        this.vencedor = vencedor;
    }


    // Outros Métodos
    public verificarVitoria(): { vitoria: boolean, vencedor: string } {
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
                (this.tiles[a - 1].getValor() === "X" || this.tiles[a - 1].getValor() === "T") &&
                (this.tiles[b - 1].getValor() === "X" || this.tiles[b - 1].getValor() === "T") &&
                (this.tiles[c - 1].getValor() === "X" || this.tiles[c - 1].getValor() === "T")
            ) {
                status_vitoria = true;
                vencedor_atual = "X"; // Só vai sair X ou O
                this.completo = true;
                this.vencedor = "X";
                break;
            }
            // Verificação de Vitória de O
            else if (
                (this.tiles[a - 1].getValor() === "O" || this.tiles[a - 1].getValor() === "T") &&
                (this.tiles[b - 1].getValor() === "O" || this.tiles[b - 1].getValor() === "T") &&
                (this.tiles[c - 1].getValor() === "O" || this.tiles[c - 1].getValor() === "T")
            ) {
                status_vitoria = true;
                vencedor_atual = "O";
                this.completo = true;
                this.vencedor = "O";
                break;
            }
        }

        // Lógica de Velha -> Encheu o Mapa e nada de alguém vencer
        if (this.tiles.every(tile => tile.getEstado() === "marcado") && status_vitoria == false) {
            status_vitoria = true;
            vencedor_atual = "V";
            this.completo = true;
            this.vencedor = "T";
        }

        return {vitoria: status_vitoria, vencedor: vencedor_atual };
    }
}
