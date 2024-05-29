const lojas = {
    "amazon": "https://cdn.icon-icons.com/icons2/2699/PNG/512/amazon_logo_icon_169612.png",
    "bemol": "https://upload.wikimedia.org/wikipedia/commons/2/22/Bemol.logo.png",
    "havan": "https://www.cache2net3.com//Repositorio/2886/Publicacoes/82459/c7f4f57f-6.png?=258706-1",
    "kamabras": "https://aca.org.br/wp-content/uploads/2023/01/transferir-6.png"
};

let produtos = [];

function copiarCodigoPix (event) {
    const input = document.createElement('textarea');
    input.value = "00020126630014BR.GOV.BCB.PIX0111986659522680226Casamento Raquel & Adelson520400005303986540550.005802BR5925Adelson Guimaraes Monteir6009SAO PAULO62140510QPAMyRPUkj6304F84B";
    document.body.appendChild(input);

    input.select();
    input.setSelectionRange(0, 99999);

    document.execCommand('copy');

    document.body.removeChild(input);

    event.target.textContent = "Código Pix copiado 👍"

    setTimeout(() => {
        event.target.textContent = "Clique para copiar código Pix 📱"
    }, 2000);
}

function listarLojas () {
    const listaLojas = document.querySelector('ul.lista-lojas');
    Object.values(lojas).forEach(loja => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src =  loja;

        li.append(img);
        listaLojas.append(li);
    });
}

function listarPorCategoria (categoria, event) {

    const ul = document.querySelector('ul.list-items');
    if (!ul) return false;

    ul.innerHTML = '';

    let filtrados = produtos.filter(item => item.aberto);

    if (categoria !== 'todos') {
        filtrados = filtrados.filter(item => item.categoria === categoria);
    }

    if (event) {
        document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    filtrados.forEach(item => {
                
        const li = document.createElement('li');
        const a = document.createElement('a');
        const card = document.createElement('div');
        const cardName = document.createElement('div');
        const cardImage = document.createElement('div');
        const image = document.createElement('img');
        const cardRodape = document.createElement('div');
        const loja = document.createElement('img');
        const preco = document.createElement('span');

        card.classList.add('card');
        
        cardName.classList.add('name');
        cardName.textContent = item.name;
        
        cardImage.classList.add('image');
        image.src = item.image;
        cardImage.append(image);

        cardRodape.classList.add('rodape');
        cardRodape.textContent = item.description;
        
        loja.src = lojas[item.loja];
        loja.classList.add('loja_icon');
        cardRodape.append(loja);

        preco.textContent = item.preco;
        preco.classList.add('preco');
        cardRodape.append(preco);

        card.append(cardName);
        card.append(cardImage);
        card.append(cardRodape);
        
        a.append(card);
        a.href = item.link;
        a.target = 'blank';

        li.append(a);

        ul.append(li);
    });
}


document.addEventListener('DOMContentLoaded', function() {

    listarLojas();

    fetch('data.json')
        .then(response => response.json())
        .then(products => {
            produtos = products;
            listarPorCategoria('todos');
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });

});
