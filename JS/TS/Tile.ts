export class Tile {
    private posicao: number; // 1 - 9
    private valor:  string = "";
    private estado: string = "disponivel"; // tipo string

    constructor(posicao: number) {
        this.posicao = posicao;
        this.valor = "";
        this.estado = "disponivel";
    }

    public getPosicao(): number {
        return this.posicao;
    }

    public getValor(): string {
        return this.valor;
    }

    public getEstado(): string {
        return this.estado;
    }

// Setters
    public setValor(valor: "X" | "O"): void {
        this.valor = valor;
        this.estado = "marcado";
    }
}
