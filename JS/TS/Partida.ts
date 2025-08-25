import { GrandeJogo } from './GrandeJogo';

// Depois que a página carregar
window.onload = () => {
    const jogo = new GrandeJogo();
    const tabuleiro = document.getElementById("grande-jogo");
    const jogos: Element[] = tabuleiro? Array.from(tabuleiro.getElementsByClassName("pequeno-jogo")): [];// em jogo - 0-8 | em jogos -> 1-9
    let jogosDisponiveis: number[] = [0,1,2,3,4,5,6,7,8];
    let vezAtual: "X" | "O" = "X"; // X começa jogando
    

    function jogar(indexPJ:number, indexTile:number)
    {
        if(isJogoDisponivel(indexPJ)){
            if(isTileDisponivel(indexPJ,indexTile)){
                alterarTile(indexPJ,indexTile); // vai trocar a imagem do tile do jogo pequeno (X | O)
                let jogoAtual = jogo.getJogo(indexPJ);
                let tileAtual = jogoAtual.getTile(indexTile);
                tileAtual.setValor(vezAtual);

                if(jogoAtual.verificarVitoria().vitoria == true){
                    let status = jogo.verificarVitoria();
                    if(status.vitoria == true){
                        fimJogo(status.vencedor); // X | O ou Empate
                    }else{
                        alterarJogoPJ(indexPJ); // Vai trocar a imagem de fundo do jogo pequeno
                        passarVez(indexPJ);
                        //exibirMensagem("Vez do Jogador " + vezAtual);
                    }
                }
            }
            else{
                exibirMensagem("Casa já marcada")
            }
        }else{
            exibirMensagem("Jogo Indisponivel")
        }
    }


    function isJogoDisponivel(indexPJ:number):boolean
    {
        if(jogo.getJogo(indexPJ).getCompleto()){
            return false;
        }
        return true;
    }

    function isTileDisponivel(indexPJ:number, indexTile:number):boolean
    {
        if(jogo.getJogo(indexPJ).getTile(indexTile).getEstado() == "marcado"){
            return false;
        }
        return true;
    }

    function alterarTile(indexPJ:number, indexTile:number):void
    {
        let jogoAtual = jogos[indexPJ];
        jogoAtual.children[indexTile].classList.remove("neutro");
        jogoAtual.children[indexTile].classList.add("jogador" + vezAtual); // JogadorX ou JogadorO
        jogoAtual.children[indexTile].textContent = vezAtual;
    }

    function alterarJogoPJ(indexPJ:number):void
    {
        let jogoAtual = jogos[indexPJ];
        jogoAtual.classList.add("vitoria" + vezAtual);

        // Deixar os Tiles do Jogo Atual com Display none: 
        Array.from(jogoAtual.children).forEach((child) => {
            child.classList.add("hidden");
        });
    }


    function fimJogo(vencedor:string):void
    {
        if(vencedor == "X"){
            tabuleiro?.classList.add("vitoria-geralX");
        }else if(vencedor == "O"){
            tabuleiro?.classList.add("vitoria-geralO");
        }else if(vencedor == "Empate"){
            tabuleiro?.classList.add("empate-geral");
        }
    }

    function passarVez(indexUltimaJogada:number):void{
        atualizarJogosDisponiveis(indexUltimaJogada);
        if(vezAtual == "X"){
            vezAtual = "O";
        }else{
            vezAtual = "X";
        }
    }

    function atualizarJogosDisponiveis(indexUltimaJogada:number):void{
        if(jogo.getJogo(indexUltimaJogada).getCompleto()){
            jogos.forEach((jogo, index) => {
                if (isJogoDisponivel(index)) {
                    jogosDisponiveis.push(index);
                    exibirMensagem("Próxima Jogada no Jogo " + (index + 1))
                }
            });
        }
        else{
            // fazer com que seja um array com apenas um elemento, justamente o index da ultima jogada
            jogosDisponiveis = [indexUltimaJogada];
            exibirMensagem("A próxima Jogada é Livre")

        }
    }

    function exibirMensagem(mensagem:string):void{
        const mensagemDiv = document.createElement("div");
        mensagemDiv.textContent = mensagem;
        document.body.appendChild(mensagemDiv);
        mensagemDiv.classList.add("mensagem");
        setTimeout(() => {
            mensagemDiv.remove();
        }, 3000);
    }

};
