import state from './state.js'
import { controls } from './elements.js';
import * as actions from './actions.js'
import * as el from './elements.js'
import { updateDisplay } from './timer.js';

export function registerControls() {
    controls.addEventListener('click', (event) => {
        const action = event.target.dataset.action
        if(typeof actions[action] != "function") {
            return
        }

        actions[action]()
    })
}
 
/*Para quando eu estiver editando o timer, apagar oque estava escrito*/
export function setMinutes() {
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = ""
    })
    /*Abaixo temos uma expressão regular, onde estou passando 
    que oque for digitado não pode ser uma letra*/

    el.minutes.onkeypress = (event) => /\d/.teste(event.key)

    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.minutes = time
        state.seconds = 0

        updateDisplay()
        el.minutes.removeAttribute('contenteditable')
    })
}