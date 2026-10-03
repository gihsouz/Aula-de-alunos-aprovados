let alunos = [];

const listaAlunos = document.getElementById("listaAlunos");
const status = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnAprovados = document.getElementById("btnAprovados");
const btnReprovados= document.getElementById("btnReprovados");


async function carregarAlunos() {

    try {
        status.textContent = "Carregando alunos...";
        const resposta = await fetch("./alunos.json");

        if (!resposta.ok) {
            throw new Error(
                "Não foi possível carregar o JSON."
            );
        }

        alunos = await resposta.json();
        status.textContent = `${alunos.length} alunos carregados.`;

        mostrarAlunos(alunos);

    } catch (erro) {

        status.textContent = `Erro: ${erro.message}`;
    }
}

function mostrarAlunos(lista) {

    listaAlunos.innerHTML = "";

    if (lista.lenght == 0) {
        listaAlunos.innerHTML = "<p>Nenhum aluno encontrado.</p>";
        return;
    }

    lista.forEach((alunos) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h2>${alunos.nome}</h2>
            <p><strong>Idade:</strong> ${alunos.idade}</p>
            <p><strong>Curso:</strong> ${alunos.curso}</p>
            <p><strong>Nota:</strong> ${alunos.nota}</p>
        `;

        listaAlunos.appendChild(card);
    });
}

function mostrarTodos() {
    
    mostrarAlunos(alunos);

    status.textContent = `${alunos.length} alunos encontrados.`;

}
function mostrarAprovados() {
    
    
    const aprovados = alunos.filter((aluno) => aluno.nota >= 6);

    mostrarAlunos(aprovados);

    status.textContent = `${aprovados.length} alunosaprovados.`;

}
function mostrarReprovados() {
    
    const reprovados = alunos.filter((aluno) => aluno.nota < 6);

    mostrarAlunos(reprovados);
    
    status.textContent = `${reprovados.length} alunos reprovados.`;

}

btnBuscar.addEventListener("click", carregarAlunos);
btnTodos.addEventListener("click", mostrarTodos);
btnAprovados.addEventListener("click", mostrarAprovados);
btnReprovados.addEventListener("click", mostrarReprovados);

