//Variaveis Globais

//DOM
let filmesLista;
let form;
let nomeInput;
let imagenInput;

let itens = [];

function renderizarFilmes(){
    filmesLista.innerHTML = "";

    if (itens.length === 0){
        filmesLista.innerHTML = "<p>Nenhum filme cadastrado ainda</p>";
        return;
    }
    
    itens.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add("item-card");

        card.innerHTML = `
            <img src="${item.imagen}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <button class="remover-btn">Remover</button>`;
        
        card.querySelector('.remover-btn').addEventListener('click', () => {
            removerItem(index)
        });

        filmesLista.appendChild(card);
    })
}

function adicionarFilme(event){
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const imagen = imagenInput.value.trim();

    if(imagen === '' || nome === ''){
        alert('Por favor preencha todos os campos');
        return
    }
    console.log(nome, imagen);
    const novoItem = {nome, imagen};

    itens.push(novoItem);

    salvarLocal()
    renderizarFilmes();

    form.reset();
    nomeInput.focus();
}

function removerItem(id){
    itens.splice(id, 1)

    salvarLocal();
    renderizarFilmes();
}

function salvarLocal() {
    localStorage.setItem("catalogoItens", JSON.stringify(itens));
}

document.addEventListener("DOMContentLoaded", () => {
    filmesLista = document.getElementById("lista-filmes");
    form = document.getElementById("form-cadastro");
    nomeInput = document.getElementById("titulo");
    imagenInput = document.getElementById("imagen");

    itens = JSON.parse(localStorage.getItem("catalogoItens")) || [];

    renderizarFilmes();

    form.addEventListener("submit", adicionarFilme)
})