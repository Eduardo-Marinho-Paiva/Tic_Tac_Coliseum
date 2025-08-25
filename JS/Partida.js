import GrandeJogo from './GrandeJogo.js';
export function jogar() { /* ... */ }

window.onload = function() {
    var jogo      = new GrandeJogo();
    var tabuleiro = document.getElementById("grande-jogo");
    var jogos     = tabuleiro
        ? Array.from(tabuleiro.getElementsByClassName("pequeno-jogo"))
        : [];
    var jogosDisponiveis = [0,1,2,3,4,5,6,7,8];
    var vezAtual         = "X"; // X começa jogando

    function jogar(indexPJ, indexTile) {
        if (!isJogoDisponivel(indexPJ)) {
            exibirMensagem("Jogo Indisponível");
            return;
        }

        if (!isTileDisponivel(indexPJ, indexTile)) {
            exibirMensagem("Casa já marcada");
            return;
        }

        alterarTile(indexPJ, indexTile);
        var jogoAtual = jogo.getJogo(indexPJ);
        var tileAtual = jogoAtual.getTile(indexTile);
        tileAtual.setValor(vezAtual);

        var resultadoPJ = jogoAtual.verificarVitoria();
        if (resultadoPJ.vitoria) {
            var resultadoGeral = jogo.verificarVitoria();
            if (resultadoGeral.vitoria) {
                fimJogo(resultadoGeral.vencedor);
            } else {
                alterarJogoPJ(indexPJ);
            }
        }
        passarVez(indexTile);

    }

    function isJogoDisponivel(indexPJ) {
        // Deve-se olhar se o index do jogo está na lista de jogosDisponiveis
        return jogosDisponiveis.includes(indexPJ) && !jogo.getJogo(indexPJ).getCompleto();
    }

    function isTileDisponivel(indexPJ, indexTile) {
        return jogo.getJogo(indexPJ).getTile(indexTile).getEstado() !== "marcado";
    }

    function alterarTile(indexPJ, indexTile) {
        var pequeno = jogos[indexPJ];
        var celula  = pequeno.children[indexTile];

        celula.classList.remove("neutro");
        celula.classList.add("jogador" + vezAtual);
        celula.textContent = vezAtual;
    }

    function alterarJogoPJ(indexPJ) {
        var pequeno = jogos[indexPJ];
        pequeno.classList.add("vitoria" + vezAtual);

        Array.from(pequeno.children).forEach(function(child) {
            child.classList.add("display");
            child.style.display = "none";
        });
    }

    function fimJogo(vencedor) {
        for (const child of tabuleiro.children) {
            Array.from(tabuleiro.children).forEach(function(child) {
                child.classList.add("display");
                child.style.display = "none";
            });
        }
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
        if (jogo.getJogo(indexTile).getCompleto() == true) {
            jogosDisponiveis = [];
            jogos.forEach(function(_, idx) {
                if (!jogo.getJogo(idx).getCompleto()) {
                    jogosDisponiveis.push(idx);
                    exibirMensagem("Próxima jogada no jogo " + (idx + 1));
                }
            });
            // exibir no console os jogos disponiveis:
            console.log("Jogos disponíveis:", jogosDisponiveis);
            exibirMensagem("A próxima jogada é livre");
        } else {
            jogosDisponiveis = [indexTile];
            exibirMensagem("A próxima jogada deve ser no jogo " + (indexTile + 1));
            console.log("Jogos disponíveis:", jogosDisponiveis);

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

    // Exponha a função jogar globalmente, ou conecte-a a eventos de clique:
    window.jogarNoPequeno = jogar;
};
