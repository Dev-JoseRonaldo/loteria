const url = 'https://brainn-api-loterias.herokuapp.com/api/v1'

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
  })
}

// função responsável por pegar o valor do index selecionado no <select>
function getSelectValue() {
  let selectValue = select.value
  selectIndex = select.selectedIndex

  getIdConcurso(selectIndex)
  changeLogo(selectValue)
}

// função responsável por mudar o nome do logo de acordo com o <select>
function changeLogo(nameLoteria) {
  logo.textContent = nameLoteria
}

// função responsável por mudar o nome do logo de acordo com o <select>
function changeIdConcurso(idLoteria, date) {
  textDesktop.textContent = `${idLoteria} - ${date}`
  textMobile.textContent = `concurso N° ${idLoteria}`
}

// função responsável por obter o ID da loteria selecionada no <select>
function getIdConcurso(indexIdConcurso) {
  axios
    .get(`${url}/loterias-concursos`)
    .then(response => {
      let concursoNumero = response.data[indexIdConcurso].concursoId
      getNumerosSorteados(concursoNumero)
    })
    .catch(error => console.error(error))
}

// função responsável em tranformar a data bruta da api no padrão "dia/mes/ano"
function getdate(dateFull) {
  let ano = dateFull.data.slice(0, 4)
  let mes = dateFull.data.slice(5, 7)
  let dia = dateFull.data.slice(8, 10)

  let date = `${dia}/${mes}/${ano}`
  return date
}

// função que pega: id da lotérica, index da lotéria, numeros sorteados, e a data do sorteio.
function getNumerosSorteados(id) {
  axios
    .get(`${url}/concursos/${id}`)
    .then(response => {
      addNumerosSorteados(response.data.numeros)

      changeIdConcurso(id, getdate(response.data))
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
