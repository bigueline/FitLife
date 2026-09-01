     const alunosSalvos = localStorage.getItem("alunos");
     const alunos = alunosSalvos ? JSON.parse(alunosSalvos): [];

     let indiceEditando = null;

     function cadastrarAluno() {
     const nomeInput = document.querySelector("#nome");
     const nome = nomeInput.value;

     const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);

     const idadeInput = document.querySelector("#idade");
     const idadeValor = idadeInput.value;

     const planoInput = document.querySelector("#plano");
     const plano = planoInput.value;

     const statusInput = document.querySelector("#status");
     const status = statusInput.value;

     const resultado = document.querySelector("#resultado");

     if (nome === "") {
        alert("O nome não pode estar vazio")
        return
     }

     if (!nomeValido) {
        alert("O nome deve conter apenas letras.")
        return
     }

     if (idadeValor === "") {
        alert("Informe a idade do aluno.")
        return
     }

     const idade = Number(idadeValor);

     if (!Number.isInteger(idade)) {
        alert("A idade deve ser um número inteiro.")
        return
     }

     if (idade < 16) {
        alert("O aluno deve ter no mínimo 16 anos")
         return
     }

     if (idade > 70) {
        alert("O aluno deve ter no máximo 70 anos")
        return
     }

     if (plano === "") {
        alert("O plano não pode estar vazio")
        return
     }

     if (status === "") {
        alert("O status não pode estar vazio")
        return
     }

     const aluno = {
        nome: nome,
        idade: idade,
        plano: plano,
        status: status,
     };
 
     console.log("Índice sendo editado:", indiceEditando);
   
     if (indiceEditando === null) {
     console.log("Índice antes de salvar:", indiceEditando);
     alunos.push(aluno);
     } else {
     alunos[indiceEditando] = aluno;
     indiceEditando = null;
     }


     localStorage.setItem("alunos", JSON.stringify(alunos));

     resultado.innerHTML = "";
     mostrarAlunos();

    nomeInput.value = "";
    idadeInput.value = "";
    planoInput.value = "";
    statusInput.value = "";
}

function mostrarAlunos() {
    const resultado = document.querySelector("#resultado");

    alunos.forEach((aluno, index) => {
        console.log(aluno.nome, index);
        resultado.innerHTML += `
            <div>
                <p>Nome: ${aluno.nome}</p>
                <p>Idade: ${aluno.idade}</p>
                <p>Plano: ${aluno.plano}</p>
                <p>Status: ${aluno.status}</p>

                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </div>
        `;
    });
}

mostrarAlunos();

function excluirAluno(index) {
    alunos.splice(index, 1);

    console.log("array depois da exclusão:", alunos);
    
    localStorage.setItem("alunos", JSON.stringify(alunos));

    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";

    mostrarAlunos()
}

    function editarAluno(index) {
    console.log("Editar aluno:", index);

    indiceEditando = index;

    const aluno = alunos[index];

    document.querySelector("#nome").value = aluno.nome;
    document.querySelector("#idade").value = aluno.idade;
    document.querySelector("#plano").value = aluno.plano;
    document.querySelector("#status").value = aluno.status;

}

    function buscarAluno() {
    const buscar = document.querySelector("#buscar").value;
     
    const alunosEncontrados = alunos.filter((aluno)=> {
    
   });
    console.log(buscar);

}

