const url = 'https://brainn-api-loterias.herokuapp.com/api/v1'
const id = 440
const select = document.querySelector('.select__sena')

function getLoterias() {
  axios
    .get(`${url}/loterias`)
    .then(response => {
      let loterias = response.data
      addLoteriasInSelect(loterias)
    })
    .catch(error => console.error(error))
}

function getIdConcurso() {
  axios
    .get(`${url}/loterias-concursos`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error(error))
}

function getNumerosSorteados(id) {
  axios
    .get(`${url}/concursos/${id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error(error))
}

function addLoteriasInSelect(loterias) {
  loterias.forEach((e, i) => {
    select.innerHTML += `<option class="sena__item" value="${loterias[i].nome}">${loterias[i].nome}</option>`
  })
}

function main() {
  getLoterias()
  getIdConcurso()
  getNumerosSorteados(id)
}

main()
