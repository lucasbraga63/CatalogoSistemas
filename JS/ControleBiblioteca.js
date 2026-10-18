const inputTitulo = document.querySelector(`#inputTitulo`)
const inputAutor = document.querySelector(`#inputAutor`)
const selectCategoria = document.querySelector(`#selectCategoria`)

const pesquisa = document.querySelector(`#pesquisa`)

const showSearch = document.querySelector(`.showSearch`)

const numLivrosCastrados = document.querySelector(`#numLivrosCastrados`)
const numDisponiveis = document.querySelector(`#numDisponiveis`)
const numEmprestados = document.querySelector(`#numEmprestados`)

let livros = [{ titulo: "aocubo", autor: "davint", categoria: "jogo" }]

function pegarDados() {
    let valueTitulo = inputTitulo.value
    let valueAutor = inputAutor.value
    let valueCategoria = selectCategoria.value

    if (valueTitulo == "") {
        alert("Preencha o titulo")
        return
    }
    if (valueAutor == "") {
        alert("Preencha o autor")
        return
    }

    return { valueTitulo, valueAutor, valueCategoria }
}

function addBook() {
    let { valueTitulo, valueAutor, valueCategoria } = pegarDados()

    let novoLivro = { titulo: valueTitulo, autor: valueAutor, categoria: valueCategoria }
    livros.push(novoLivro)
    // alert(valueTitulo + valueAutor + valueCategoria)

    inputTitulo.value = ""
    inputAutor.value = ""

    atualizarCardInfos()
    innerCardsBooks()
}

atualizarCardInfos()
function atualizarCardInfos(){
    numLivrosCastrados.innerText = livros.length
    //terminar depois
    numDisponiveis.innerText = livros.length
    numEmprestados.innerText = 0
}

let disponibilidade = true

innerCardsBooks() 
function innerCardsBooks() {
    showSearch.innerHTML = ""

    for (let i = 0; i < livros.length; i++) {
        let cardHtml = `<div class="cardLivro">
                        <div class="cardShowTop">
                            <div class="showSearchInfo">
                                <h2>${livros[i].titulo}</h2>
                                <p>${livros[i].autor} • ${livros[i].categoria}</p>
                            `
        if (disponibilidade == false) {
            cardHtml += ` <p>Com: nome • Devolver até 00/00/0000</p>`
        }

        cardHtml += `</div>`
        if (disponibilidade == true) {
            cardHtml += ` <p id="statusTrue">Disponivel</p>`
        }
        if (disponibilidade == false) {
            cardHtml += `<p id="statusFalse">Emprestado</p>`
        }

        cardHtml += `</div>
                        <button onclick="excluir(${i})">deletar</button>`
        if (disponibilidade == true) {
            cardHtml += `<button  onclick="alterarDisponivel(${!disponibilidade, i})">Emprestar</button>`
        }
        if (disponibilidade == false) {
            cardHtml += `<button onclick="alterarDisponivel(${!disponibilidade})">registar devolucao</button>`
        }
        cardHtml += `</div>`
        showSearch.innerHTML += cardHtml
    }
}

function excluir(index) {
    // alert("deletar" + index)
    livros.splice(index, 1)
    innerCardsBooks()
}

function alterarDisponivel(status, index) {
    // alert(status)
    disponibilidade = status
    innerCardsBooks()
}

pesquisa.addEventListener('input', (event) => {

    //alert(pesquisa.value)
    // alert(livros[0].titulo[0])

    // alert(livros[0].titulo[0].includes(pesquisa.value))
    let posicaoCardspequisados = []
    let igual = false
    for (let i = 0; i < livros.length; i++) {
        igual = false
        if (livros[i].titulo.includes(pesquisa.value) == true) {
            posicaoCardspequisados.push(i)
            // pesquisarInnerCardsBooks()
        }
        if (igual == true) {

        }
    }
    //alert(posicaoCardspequisados)
    pesquisarInnerCardsBooks(posicaoCardspequisados)
})

function pesquisarInnerCardsBooks(posicao) {
    showSearch.innerHTML = ""
    let tem = false
    let indexPosicao = 0
    for (let i = 0; i < livros.length; i++) {
        if (i == posicao[indexPosicao]) {
            indexPosicao++
            let cardHtml = `<div class="cardLivro">
                        <div class="cardShowTop">
                            <div class="showSearchInfo">
                                <h2>${livros[i].titulo}</h2>
                                <p>${livros[i].autor} • ${livros[i].categoria}</p>
                            `
            if (disponibilidade == false) {
                cardHtml += ` <p>Com: nome • Devolver até 00/00/0000</p>`
            }

            cardHtml += `</div>`
            if (disponibilidade == true) {
                cardHtml += ` <p id="statusTrue">Disponivel</p>`
            }
            if (disponibilidade == false) {
                cardHtml += `<p id="statusFalse">Emprestado</p>`
            }

            cardHtml += `</div>
                        <button onclick="excluir(${i})">deletar</button>`
            if (disponibilidade == true) {
                cardHtml += `<button  onclick="alterarDisponivel(${!disponibilidade, i})">Emprestar</button>`
            }
            if (disponibilidade == false) {
                cardHtml += `<button onclick="alterarDisponivel(${!disponibilidade})">registar devolucao</button>`
            }
            cardHtml += `</div>`
            showSearch.innerHTML += cardHtml
            tem = true
        }
    }
    if(tem == false){
        showSearch.innerHTML = `<p>Nenhum livro encontrado.</p>`
    }
}