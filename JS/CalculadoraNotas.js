const nomeAluno = document.getElementById('nomeAluno')
const materia = document.getElementById('materias')
const nota1 = Number(document.getElementById('nota1'))
const nota2 = Number(document.getElementById('nota2'))
const nota3 = Number(document.getElementById('nota3'))
const nota4 = Number(document.getElementById('nota4'))
const enviarBtn = document.getElementById('enviarBtn')
const limparTudo = document.getElementById('limparTudo')
const containerMateriasRegistradas = document.getElementById('ContainerMateriasRegistradas')
const card = document.querySelector('.card')

async function PegandoMateria() {
    const resposta = await fetch('../Json/CalculadoraNotas.json')
    const dados = await resposta.json()

    const materiaSelecionada = dados.find(dado => dado.materia == materia.value)

    if (materiaSelecionada) {
        const informacoes = ValidandoNota(materiaSelecionada)
        GerandoCard(informacoes)
    } else {
        console.log(`A matéria de ${materia.value} não foi encontrada`)
    }
}

enviarBtn.addEventListener('click', () => {
    PegandoMateria()
})

function ValidandoNota(materiaEscolhida) {
    const nomeMateria = materiaEscolhida.materia
    const imagemMateria = materiaEscolhida.imagem
    const media = (nota1.value + nota2.value + nota3.value + nota4.value) / 4
    let texto = ''
    let corNota = ''

    if (media < 6) {
        texto = 'Você ficou abaixo da média, estude mais'
        corNota = 'rgb(177, 14, 14)'
    } else if (media <= 9) {
        texto = 'Bom, mas tem como melhorar'
        corNota = 'rgb(231, 228, 10)'
    } else {
        texto = 'Ótimo, continue assim!'
        corNota = 'rgb(65, 175, 13)'
    }

    GerandoCard()
    return { nomeMateria, imagemMateria, texto, corNota, media }

}

function GerandoCard(informacao) {
    const mensagemVazia = containerMateriasRegistradas.querySelector('.cardSemNada')

    if (mensagemVazia) {
        mensagemVazia.remove()
    }

        containerMateriasRegistradas.innerHTML += `
      <div class="card">
                <div class="imagem">
                    <img src="${informacao.imagemMateria}" alt="imagem">
                </div>
                <div class="InformacaoMateria">
                    <h2>${informacao.nomeMateria}</h2>
                    <p>${informacao.texto}</p>
                    <span style="color: ${informacao.corNota};">Media: ${informacao.media}</span>
                </div>
               </div>
     
     `
}

