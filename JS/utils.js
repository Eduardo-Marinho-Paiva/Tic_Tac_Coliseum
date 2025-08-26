export const COMBINACOES_VITORIA = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

export function verificarVitoriaGenerico(items, getValue) {
    for (const combinacao of COMBINACOES_VITORIA) {
        const [a, b, c] = combinacao;
        
        if (
            (getValue(items[a - 1]) === "X" || getValue(items[a - 1]) === "T") &&
            (getValue(items[b - 1]) === "X" || getValue(items[b - 1]) === "T") &&
            (getValue(items[c - 1]) === "X" || getValue(items[c - 1]) === "T")
        ) {
            return { vitoria: true, vencedor: "X" };
        }
        
        if (
            (getValue(items[a - 1]) === "O" || getValue(items[a - 1]) === "T") &&
            (getValue(items[b - 1]) === "O" || getValue(items[b - 1]) === "T") &&
            (getValue(items[c - 1]) === "O" || getValue(items[c - 1]) === "T")
        ) {
            return { vitoria: true, vencedor: "O" };
        }
    }
    
    return { vitoria: false, vencedor: "none" };
}