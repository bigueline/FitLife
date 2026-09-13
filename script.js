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
   
     if (indiceEditando === null) {
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

    resultado.innerHTML = "";

    renderizarAlunos(alunos);
}

mostrarAlunos();

function excluirAluno(index) {
    alunos.splice(index, 1);
    
    localStorage.setItem("alunos", JSON.stringify(alunos));

    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";

    mostrarAlunos()

}

    function editarAluno(index) {

    indiceEditando = index;

    const aluno = alunos[index];

    document.querySelector("#nome").value = aluno.nome;
    document.querySelector("#idade").value = aluno.idade;
    document.querySelector("#plano").value = aluno.plano;
    document.querySelector("#status").value = aluno.status;

}

    function buscarAluno() {
    const buscar = document.querySelector("#buscar").value;

    if (buscar === "") {
        alert("Informe o nome do aluno para buscar.");
        return;
    }

    if (alunos.length === 0) {
        alert("Não há alunos cadastrados.");
        return;
    }
     

    const alunosEncontrados = alunos.filter((aluno)=> {
    return aluno.nome.toLowerCase().includes(buscar.toLowerCase());
   });
    
    const resultado = document.querySelector("#resultado");

    if (alunosEncontrados.length === 0) {
        resultado.innerHTML = "<p>Nenhum aluno encontrado.</p>";
        return;
    }

    resultado.innerHTML = "";
    renderizarAlunos(alunosEncontrados);

}

    function mostrarTodos() {
      const resultado = document.querySelector("#resultado");
      const buscarinput = document.querySelector("#buscar");
       
      resultado.innerHTML = "";

        mostrarAlunos();
        buscarinput.value = "";

}

function renderizarAlunos(lista) {
    const resultado = document.querySelector("#resultado");
    
    lista.forEach((aluno, index) => {
        const indiceOriginal = alunos.indexOf(aluno);

        const classeStatus = aluno.status === "Ativo"
    ? "status-ativo"
    : "status-inativo"; 

        resultado.innerHTML += `
            <div class="aluno-item">

                 <div class="aluno-topo">
                     <p class="aluno-nome">${aluno.nome}</p>

                       <div class="aluno-status">
                         <span class="${classeStatus}">${aluno.status}</span>
                       </div> 

                    </div>
                     <p class="aluno-idade">${aluno.idade}</p>
                     <p class="aluno-plano">${aluno.plano}</p>
                  
                     <p class="aluno-info">${aluno.idade} anos • ${aluno.plano}</p>

                   <div class="aluno-botoes">
                     <button class="button-editar" onclick="editarAluno(${indiceOriginal})">Editar</button>
                     <button class="button-excluir" onclick="excluirAluno(${indiceOriginal})">Excluir</button>
                  </div>

                
            </div>

       
        `;
    
    });
}   


