async function CriandoCardSistemas() {

    try {

        const resposta = await fetch('Json/sistemasHome.json')
        const sistemas = await resposta.json()
        const containerCards = document.getElementById('containerSistemas')

        sistemas.forEach(sistema => {
            containerCards.innerHTML += `
           <div class="cardSistema">
        <div class="cabecalhoCard">
           <h2>${sistema.nome}</h2>
           <p>${sistema.descricao}</p>
        </div>
        <div class="botoes">
         <a href="${sistema.link}" target="_blank">Entrar</a>
        </div>
     </div>
           `

        });

    } catch (error) {
        console.error("O arquivo json não foi encontrado")
    }
}

CriandoCardSistemas()