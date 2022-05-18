const url = 'https://brainn-api-loterias.herokuapp.com/api/v1'
const id = 440
const select = document.querySelector('.select__sena')
const numerosbox = document.querySelector('.left__numbers')
const logo = document.querySelector('.logo-center__title')

const textDesktop = document.querySelector('.text-desktop__span')
const textMobile = document.querySelector('.text-down__text-mobile')

// função responsável por pegar na api todas as loterias via axios
function getLoterias() {
  axios
    .get(`${url}/loterias`)
    .then(response => {
      let loterias = response.data
      addLoteriasInSelect(loterias)
    })
    .catch(error => console.error(error))
}

// função responsável por colocar todas as loterias em uma <option> diferente dentro do <select>
function addLoteriasInSelect(loterias) {
  loterias.forEach((e, i) => {
    let option = document.createElement('option')
    option.text = `${loterias[i].nome}`
    option.value = `${loterias[i].nome}`
    option.classList.add('sena__item')
    select.add(option)
    //select.innerHTML += `<option class="sena__item" value="${loterias[i].nome}">${loterias[i].nome}</option>`
  })
}

// função responsável por pegar o valor do index selecionado no <select>
function getSelectValue() {
  let selectValue = select.value
  selectIndex = select.selectedIndex

  getIdConcurso(selectIndex)
}

function getIdConcurso(indexIdConcurso) {
  axios
    .get(`${url}/loterias-concursos`)
    .then(response => {
      let concursoNumero = response.data[indexIdConcurso].concursoId
      getNumerosSorteados(concursoNumero)
    })
    .catch(error => console.error(error))
}

function getNumerosSorteados(id) {
  axios
    .get(`${url}/concursos/${id}`)
    .then(response => {
      addNumerosSorteados(response.data.numeros)
    })
    .catch(error => console.error(error))
}

// função responsável por colocar todos os numeros sorteados (recebidos da api) na <div> que serve de box pra eles
function addNumerosSorteados(numeros) {
  // esse innerHTML serve para 'apagar' os numeros anteriores.
  numerosbox.innerHTML = ''
  numeros.forEach((e, i) => {
    numerosbox.innerHTML += `<div class="numbers__item">
      <p class="item__text">${numeros[i]}</p>
    </div>
    `
  })
}
//função reponsável por chamar as outras funções
function main() {
  getLoterias()
  getSelectValue()
}

main()
