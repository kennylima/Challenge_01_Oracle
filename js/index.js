import createStore from './store.js'
import { ENCODER, DECODER } from './dictionary.js'

const store = createStore({
  input: '',
  output: '',
  showOutput: false
})

const encodeDecode = translateFn => () => {

  const text = translateFn(store.input
    .get()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  )

  store.output.set(text)
  store.showOutput.set(true)
}

document
  .querySelector('#codificar')
  .addEventListener('click', encodeDecode(ENCODER))

document
  .querySelector('#decodificar')
  .addEventListener('click', encodeDecode(DECODER))

document
  .querySelector('#copiar')
  .addEventListener('click', () => {
    navigator.clipboard.writeText(store.output.get())
  })