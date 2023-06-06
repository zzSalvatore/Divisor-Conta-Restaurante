// Variável para armazenar os dados da conta
let conta = {
  clientes: [],
};

function adicionarProduto() {
  // Obtendo o nome do cliente
  const nomeClienteInput = document.getElementById('nomeCliente');
  const nomeCliente = nomeClienteInput.value.trim();

  // Verificando se o nome do cliente é válido
  if (nomeCliente === '') {
    alert('Digite o nome do cliente.');
    return;
  }

  // Verificando os produtos selecionados
  const produtoInputs = document.getElementsByName('produto');
  const quantidadeInputs = document.querySelectorAll('input[type="number"]');

  let algumProdutoSelecionado = false;

  // Verificando cada produto selecionado
  produtoInputs.forEach((input, index) => {
    if (input.checked) {
      const valorProduto = parseFloat(input.value.split(':')[1]);
      const quantidade = parseFloat(quantidadeInputs[index].value);

      if (!isNaN(quantidade) && quantidade > 0) {
        const produto = {
          nome: input.value.split(':')[0],
          valor: valorProduto,
          quantidade: quantidade,
        };

        // Verificando se o cliente já existe na conta
        const clienteExistente = conta.clientes.find((cliente) => cliente.nome === nomeCliente);

        if (clienteExistente) {
          // Adicionando o produto ao cliente existente
          clienteExistente.produtos.push(produto);
        } else {
          // Adicionando o cliente à conta com o produto
          const novoCliente = {
            nome: nomeCliente,
            produtos: [produto],
          };
          conta.clientes.push(novoCliente);
        }

        algumProdutoSelecionado = true;
      }
    }
  });

  // Verificando se pelo menos um produto foi selecionado
  if (!algumProdutoSelecionado) {
    alert('Selecione pelo menos um produto e digite a quantidade.');
    return;
  }

  // Limpando os campos do formulário
  nomeClienteInput.value = '';
  produtoInputs.forEach((input) => (input.checked = false));
  quantidadeInputs.forEach((input) => (input.value = ''));

  alert('Produto adicionado com sucesso!');
}

function finalizarConta(event) {
  event.preventDefault();

  // Realizando o cálculo da divisão da conta
  const taxaServico = 0.1; // 10% de taxa de serviço

  conta.clientes.forEach((cliente) => {
    const totalCliente = cliente.produtos.reduce((total, produto) => total + produto.valor * produto.quantidade, 0);
    const valorTaxa = totalCliente * taxaServico;
    const valorComTaxa = totalCliente + valorTaxa;
    const valorIndividual = valorComTaxa.toFixed(2);

    cliente.valorIndividual = valorIndividual;
  });

  // Exibindo o resultado
  const resultadoElement = document.getElementById('resultado');
  resultadoElement.innerHTML = '';

  conta.clientes.forEach((cliente) => {
    const linhaResultado = document.createElement('h5');
    linhaResultado.textContent = `${cliente.nome}: R$ ${cliente.valorIndividual}`;

    const produtosConsumidos = document.createElement('ul');
    cliente.produtos.forEach((produto) => {
      const itemProduto = document.createElement('li');
      itemProduto.textContent = `${produto.nome} - ${produto.quantidade}x - R$ ${(produto.valor * produto.quantidade).toFixed(2)}`;
      produtosConsumidos.appendChild(itemProduto);
    });

    linhaResultado.appendChild(produtosConsumidos);
    resultadoElement.appendChild(linhaResultado);
  });

}

function gerarNotaFiscal() {

  // Criando o elemento da nota fiscal
  const notaFiscalElement = document.createElement('div');
  notaFiscalElement.classList.add('nota-fiscal');

  const resultado = document.getElementById('resultado');
  resultado.style.display = "none";

  conta.clientes.forEach((cliente) => {
    const notaCliente = document.createElement('div');
    notaCliente.classList.add('nota-cliente');

    const nomeCliente = document.createElement('h3');
    nomeCliente.textContent = `Cliente: ${cliente.nome}`;
    notaCliente.appendChild(nomeCliente);

    const produtosConsumidos = document.createElement('ul');
    cliente.produtos.forEach((produto) => {
      const itemProduto = document.createElement('li');
      itemProduto.textContent = `${produto.nome} - ${produto.quantidade}x - R$ ${(produto.valor * produto.quantidade).toFixed(2)}`;
      produtosConsumidos.appendChild(itemProduto);
    });

    notaCliente.appendChild(produtosConsumidos);

    const valorTotal = document.createElement('h4');
    valorTotal.textContent = `Total: R$ ${cliente.valorIndividual}`;

    notaCliente.appendChild(valorTotal);

    notaFiscalElement.appendChild(notaCliente);
  });

  // Exibindo a nota fiscal
  const resultadoElement = document.getElementById('notaFiscal');
  resultadoElement.innerHTML = '';
  resultadoElement.appendChild(notaFiscalElement);

  // Mudando o display
  const divDisplay = document.getElementById('notaFiscal');
  divDisplay.style.display = 'flex';
}

function finalizar() {
  location.reload();
}

// Event Listener para o botão "Adicionar"
const adicionarButton = document.getElementById('adicionar');
adicionarButton.addEventListener('click', adicionarProduto);

// Event Listener para o botão "Finalizar Conta"
const finalizarButton = document.getElementById('finalizar');
finalizarButton.addEventListener('click', finalizar);

// Event Listener para o botão "Gerar Nota Fiscal"
const notaFiscalButton = document.getElementById('gerarNotaFiscal');
notaFiscalButton.addEventListener('click', gerarNotaFiscal);





