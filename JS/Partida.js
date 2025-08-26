import { GrandeJogo } from './GrandeJogo.js';

window.onload = function() {
    const jogo           = new GrandeJogo();
    const tabuleiro      = document.getElementById("grande-jogo");
    const jogos          = tabuleiro.getElementsByClassName("pequeno-jogo");
    let jogosDisponiveis = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let vezAtual         = "X";
    // Adiciona os event listeners para cada tile dinamicamente
    for (let i = 0; i < jogos.length; i++) {
        const pequenoJogo = jogos[i];
        for (let j = 0; j < pequenoJogo.children.length; j++) {
            const tile = pequenoJogo.children[j];
            tile.addEventListener("click", () => jogar(i, j));
        }
    }

    function jogar(indexPJ, indexTile) {
        if (jogo.getCompleto()) {
            exibirMensagem("Jogo Finalizado");
            return;
        }
        if (!isJogoDisponivel(indexPJ)) {
            exibirMensagem("Jogo Indisponível");
            return;
        }

        const jogoAtual = jogo.getJogo(indexPJ);
        const tileAtual = jogoAtual.getTile(indexTile);

        if (tileAtual.getEstado() === "marcado") {
            exibirMensagem("Casa já marcada");
            return;
        }

        alterarTile(indexPJ, indexTile);
        tileAtual.setValor(vezAtual);

        const resultadoPJ = jogoAtual.verificarVitoria();
        if (resultadoPJ.vitoria) {
            alterarJogoPJ(indexPJ, resultadoPJ.vencedor);
            const resultadoGeral = jogo.verificarVitoria();
            if (resultadoGeral.vitoria) {
                fimJogo(resultadoGeral.vencedor);
            }
        } else if (jogoAtual.tiles.every(tile => tile.getEstado() === "marcado")) {
            alterarJogoPJ(indexPJ, "V");
            const resultadoGeral = jogo.verificarVitoria();
            if (resultadoGeral.vitoria) {
                fimJogo(resultadoGeral.vencedor);
            }
        }

        passarVez(indexTile);
    }

    function isJogoDisponivel(indexPJ) {
        return jogosDisponiveis.includes(indexPJ) && !jogo.getJogo(indexPJ).getCompleto();
    }

    function alterarTile(indexPJ, indexTile) {
        const pequeno = jogos[indexPJ];
        const celula = pequeno.children[indexTile];

        celula.classList.remove("neutro");
        celula.classList.add("jogador" + vezAtual);
        celula.textContent = vezAtual;
    }

    function alterarJogoPJ(indexPJ, vencedor) {
        const pequeno = jogos[indexPJ];
        if (vencedor === "X") {
            pequeno.classList.add("vitoriaX");
        } else if (vencedor === "O") {
            pequeno.classList.add("vitoriaO");
        } else {
            pequeno.classList.add("empate");
        }

        Array.from(pequeno.children).forEach(child => {
            child.style.display = "none";
        });
    }

    function fimJogo(vencedor) {
        jogo.setCompleto();
        Array.from(tabuleiro.children).forEach(child => {
            child.style.display = "none";
        });

        if (vencedor === "X") {
            tabuleiro.classList.add("vitoria-geralX");
        } else if (vencedor === "O") {
            tabuleiro.classList.add("vitoria-geralO");
        } else {
            tabuleiro.classList.add("empate-geral");
        }
    }

    function passarVez(indexTile) {
        atualizarJogosDisponiveis(indexTile);
        vezAtual = vezAtual === "X" ? "O" : "X";
    }

    function atualizarJogosDisponiveis(indexTile) {
        const proximoJogo = jogo.getJogo(indexTile);

        if (proximoJogo.getCompleto()) {
            jogosDisponiveis = [];
            for (let i = 0; i < jogos.length; i++) {
                if (!jogo.getJogo(i).getCompleto()) {
                    jogosDisponiveis.push(i);
                }
            }
            exibirMensagem("Próxima jogada é livre");
        } else {
            jogosDisponiveis = [indexTile];
            exibirMensagem("A próxima jogada deve ser no jogo " + (indexTile + 1));
        }
    }

    function exibirMensagem(mensagem) {
        var div = document.createElement("div");
        div.textContent = mensagem;
        div.classList.add("mensagem");
        document.body.appendChild(div);

        setTimeout(function() {
            div.remove();
        }, 3000);
    }
};