/* =====================================================
   SCRIPT PRINCIPAL — RAFFAFE.ARTE
   Controla o que aparece em cada página
===================================================== */

/* ======================
   CONFIGURAÇÕES GERAIS
====================== */

// nomes dos meses (0 a 11)
const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// data atual
const hoje = new Date();
const mesAtualIndex = hoje.getMonth(); // 0 a 11
const proximoMesIndex = (mesAtualIndex + 1) % 12;

// página atual (definida no body)
const pagina = document.body.dataset.pagina;

/* ======================
   FUNÇÕES AUXILIARES
====================== */

// cria um card de produto
function criarCard(produto) {
  const card = document.createElement("div");
  card.className = "card";

  // imagem
  const imagemDiv = document.createElement("div");
  imagemDiv.className = "imagem";

  const img = document.createElement("img");
  img.src = produto.imagem;
  img.alt = produto.titulo;

  imagemDiv.appendChild(img);

  // título
  const titulo = document.createElement("h3");
  titulo.textContent = produto.titulo;

  // descrição
  const descricao = document.createElement("p");
  descricao.textContent = produto.tema || produto.descricao || "";

  // botão
  const botao = document.createElement("a");
  botao.href = produto.link;
  botao.target = "_blank";
  botao.className = "botao";
  botao.textContent = "Comprar";

  // montar estrutura principal
  card.appendChild(imagemDiv);
  card.appendChild(titulo);
  card.appendChild(descricao);

  // 👉 PREÇO ENTRA AQUI
  if (produto.preco) {
    const preco = document.createElement("div");
    preco.className = "preco";
    preco.textContent = produto.preco;
    card.appendChild(preco);
  }

  // botão sempre por último
  card.appendChild(botao);

  return card;
}



// limpa uma vitrine
function limparVitrine(vitrine) {
  vitrine.innerHTML = "";
}

/* ======================
   HOME — MÊS ATUAL
====================== */

function montarMesAtual() {
  const titulo = document.getElementById("titulo-mes-atual");
  const vitrine = document.getElementById("vitrine-mes-atual");

  if (!titulo || !vitrine) return;

  titulo.textContent = nomesMeses[mesAtualIndex];

  limparVitrine(vitrine);

  const produtosMes = produtos.filter(
    produto => produto.mes === mesAtualIndex + 1
  );

  produtosMes.forEach(produto => {
    vitrine.appendChild(criarCard(produto));
  });
}

/* ======================
   HOME — PRÓXIMO MÊS
====================== */

function montarProximoMes() {
  const titulo = document.getElementById("titulo-proximo-mes");
  const vitrine = document.getElementById("vitrine-proximo-mes");

  if (!titulo || !vitrine) return;

  titulo.textContent = nomesMeses[proximoMesIndex];

  limparVitrine(vitrine);

  const produtosMes = produtos.filter(
    produto => produto.mes === proximoMesIndex + 1
  );

  produtosMes.forEach(produto => {
    vitrine.appendChild(criarCard(produto));
  });
}

/* ======================
   PÁGINAS DE CATEGORIA
====================== */

function montarCategoria(categoria) {
  const vitrine = document.querySelector(".vitrine");
  if (!vitrine) return;

  limparVitrine(vitrine);

  const produtosCategoria = produtos.filter(
    produto => produto.categoria === categoria
  );

  produtosCategoria.forEach(produto => {
    vitrine.appendChild(criarCard(produto));
  });
}

/* ======================
   PÁGINA DATAS — POR MÊS
====================== */

function montarDatasPorMes() {
  const container = document.querySelector(".conteudo");
  if (!container) return;

  container.innerHTML = "";

  for (let mes = 1; mes <= 12; mes++) {

    const produtosDoMes = produtos.filter(
      produto =>
        produto.categoria === "datas" &&
        produto.mes === mes
    );

    if (produtosDoMes.length === 0) continue;

    const secao = document.createElement("section");
    secao.className = "secao-mes";

    const titulo = document.createElement("h2");
    titulo.textContent = nomesMeses[mes - 1];

    const vitrine = document.createElement("div");
    vitrine.className = "vitrine";

    produtosDoMes.forEach(produto => {
      vitrine.appendChild(criarCard(produto));
    });

    secao.appendChild(titulo);
    secao.appendChild(vitrine);
    container.appendChild(secao);
  }
}

/* ======================
   ROTEAMENTO POR PÁGINA
====================== */

if (pagina === "home") {
  montarMesAtual();
  montarProximoMes();
}

if (pagina === "datas") {
  montarDatasPorMes();
}

if (pagina === "conscientizacao") {
  montarCategoria("conscientizacao");
}

if (pagina === "jogos") {
  montarCategoria("jogos");
}

if (pagina === "kits") {
  montarCategoria("kits");
}

if (pagina === "criacao") {
  montarCategoria("criacao");
}

if (pagina === "acolhe") {
  montarCategoria("acolhe");
}

if (pagina === "livros") {
  montarCategoria("livros");
}

if (pagina === "volta") {
  montarCategoria("volta");
}
