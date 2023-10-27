 //Declaração de variaveis, modal, body, nome, função, salário e do botão salvar
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

//Variavel de itens que armazena os itens do cadastro/banco e a variavél ID que vai armazenar o index que ajuda na ação de edição
let itens
let id

//Funções que pegam os itens do cadastro usando o getitem "dbfunc" E CASO NÃO TENHA NADA ele da return em uma array vázio  | função que seta os itens dos itens (literalmente) dentro do dbfunc
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}
//função que calla o openmodal do inicio com o paramétro edit que está definido como true
function editItem(index) {

  openModal(true, index)
}
//função de deletar que é chamado quando alguém aperta o botão de "excluir" ela remove o item da lista , fora isso ele tá chamando a função SetItensDB pra dar update no registro e depois recarrega a lista atualizada com 
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}
//função que literalmente é usada para inserir um novo item na lista. Ela também cria um elemento de linha chamado "tr" que preenche as células da tabela com os dados do funcionário 
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}
//é um evento do botão "salvar" que tem na web da janela modal quando clicado ele lida com a edição e adição de um item, atualiza os dados armazenados do setitensBD, fecha a janela modal e atualiza   
btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }
//Carrega os items da lista a partir do armazenamento getItensBD limpa o conteúdo da tabela 
  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


