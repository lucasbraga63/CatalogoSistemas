
const API_URL = "/atividades";

const formAtividade = document.getElementById("truc-form");
const inputId = document.getElementById("id");
const inputDescricao = document.getElementById("tarefa");
const inputPrioridade = document.getElementById("prior");
const listaAtividades = document.getElementById("lista");

async function carregarAtividades() {
    const resposta = await fetch(API_URL);
    const atividades = await resposta.json();

    listaAtividades.innerHTML = "";

    atividades.forEach((atividade) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="fiel">
                <p><strong>Descrição:</strong> ${atividade.tarefa}</p>
                <p><strong>Prioridade:</strong> ${atividade.prior}</p>
            </div>

            <div class="card-botoes">
                <button onclick="editarAtividade(${atividade.id})">
                    Editar
                </button>

                <button onclick="excluirAtividade(${atividade.id})">
                    Excluir
                </button>
            </div>
        `;

        listaAtividades.appendChild(card);
    });
}

formAtividade.addEventListener("submit", async (event) => {
    event.preventDefault();

    const atividade = {
        tarefa: inputDescricao.value,
        prior: inputPrioridade.value
    };

    if (inputId.value) {
        await fetch(`${API_URL}/${inputId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atividade)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atividade)
        });
    }

    limparFormulario();
    await carregarAtividades();
});

