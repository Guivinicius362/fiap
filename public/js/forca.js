window.onload = function () {

    //inicializar contexto;
    var PALAVRAS = [
        { palavra: "GELO", dica: "Água gelada" },
        { palavra: "DESERTO", dica: "Região" },
        { palavra: "PERDIDO", dica: "Pessoa desaparecida" }
    ];
    var ALFABETO = [
        "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X",
        "Y", "Z"
    ];
    var sublinhado = document.getElementById('sublinhado');
    var tentativas = document.getElementById('tentativas');
    var dica = document.getElementById('dica');
    var teclado = document.getElementById("teclado");
    var letrasUtilizadas = document.getElementById("letrasUtilizadas");
    var contagemDeTentativas;
    var palavraSorteada;
    iniciarJogo();

    //reseta o jogo
    function iniciarJogo() {
        contagemDeTentativas = 7;
        palavraSorteada = sortearPalavra();
        dica.textContent = palavraSorteada.dica;
        sublinhado.textContent = sublinharTamanhaDaPalavra(palavraSorteada.palavra);
        tentativas.textContent = '' + contagemDeTentativas;
        teclado.innerHTML = '';
        letrasUtilizadas.innerHTML = '';
        criarLetras();
    }

    //verifica letras clicadas e faz demais tratativas, tais como: reduzir número de tentativas e revelar letras
    function verificarLetraClicada(letra) {
        var possuiLetra = false;
        for (var i = 0; i < palavraSorteada.palavra.length; i++) {
            if ((palavraSorteada.palavra.charAt(i) === letra)) {
                possuiLetra = true;
                revelarLetras(letra, i);
            }
        }
        if (!possuiLetra) {
            reduzirTentativas();
        }
    }

    //cria cada tecla do teclado, e sua função de se mover quando clicada
    function criarTecla(letra) {
        var letraDisponivel = criarElementoDeLetrasFilhas(teclado, letra);
        letraDisponivel.onclick = function () {
            letraDisponivel.remove();
            criarElementoDeLetrasFilhas(letrasUtilizadas, letra);
            verificarLetraClicada(letra);
        }
    }

    //cria o span de elementos filhos da div pai
    function criarElementoDeLetrasFilhas(elemento, letra) {
        var letraUtilizada = document.createElement("div");
        letraUtilizada.className = "teclas"
        var texto = document.createTextNode(letra + ' ');
        letraUtilizada.appendChild(texto);
        elemento.appendChild(letraUtilizada);
        return letraUtilizada;
    }

    //revela letra da palavra ainda oculta
    function revelarLetras(letra, indice) {
        sublinhado.textContent = trocarLetraEm(sublinhado.textContent, letra, indice);
        acertouAPalavra();
    }

    //reduz o número de tentativas, tanto na contagem quando na exibição gráfica. Caso elas se esgotem reseta o jogo
    function reduzirTentativas() {
        contagemDeTentativas--;
        tentativas.textContent = '' + contagemDeTentativas;
        if (contagemDeTentativas <= 0) {
            iniciarJogo();
            alert('Opa, não foi dessa vamos. Vamos recomeçar ;)');
        }
    }

    //verifica se o usuário acertou a palavra, se sim reseta o jogo
    function acertouAPalavra() {
        if (!sublinhado.textContent.includes('_')) {
            setTimeout(function () {
                alert('Parabéns, você está ajudando o Nunu a retornar a sua família');
                iniciarJogo();
            }, 100);

        }
    }

    //retorna palavra com letra substituída em determinada posição
    function trocarLetraEm(palavra, letra, indice) {
        return palavra.substring(0, indice) + letra + palavra.substring(indice + 1);
    }

    //sorteia uma palavra do array de palavras, baseado no tamanho do array alguma mensagem será selecionada
    function sortearPalavra() {
        var sortearIndice = Math.floor(Math.random() * PALAVRAS.length);
        return PALAVRAS[sortearIndice];
    }

    //cria a palavra sublinhada
    function sublinharTamanhaDaPalavra(palavra) {
        var sublinhado = '';
        palavra.split('').forEach(function () {
            sublinhado += '_';
        })
        return sublinhado;
    }

    //cria todas as letras do teclado
    function criarLetras() {
        ALFABETO.forEach(function (letra) {
            criarTecla(letra);
        })
    }
}


