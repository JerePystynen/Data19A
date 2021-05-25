// Käyttäjä luo äänestyksen, jolle antaa nimen ja näkyvyys ajan. Eli äänestys on näkyvissä käyttäjän määrittelemän ajan.
// Tämän jälkeen käyttäjä luo äänestyksen kohteet, joita voi olla 2 tai enemmän
// Käyttäjä voi jälkeen päin poistaa ja muokata äänestyksiä. Nämä toiminnot pitää voida suojata salasanalla.
// Äänestyksen tiedot tallennetaan tietokantaan.
// Muut käyttäjät voivat selata luotuja äänestyksiä
// He voivat valita haluamansa äänestyksen ja äänestää kerran.
// He voivat myös nähdä äänestyksen tilanteen.

// if false, doesn't save users data on exiting the page.
// Also, doesn't include the option to set a timer for the opinion.
let saveUserData = false

let creationForm = document.getElementsByClassName('creation-form')[0]
let formStartBtn = document.getElementById('form-start-btn')

// Start logic

window.onload = function () {
    let op = document.getElementsByClassName("op")
    for (let i = 0; i < op.length; i++) {
        let opinion = op[i]
        opinion.onclick = function () {
            console.log(`selected opinion ${i}`)
        }
    }

    formStartBtn.onclick = function () { createOpinion() }
}

// AJAX logic

// function createPollAjax(header, options) {
//     let date = new Date()
//     var data = JSON.stringify({
//         "header": header,
//         "date": `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
//         "time": `${date.getHours()}.${date.getMinutes().length > 1 ? date.getMinutes() : "0" + date.getMinutes()}`,
//         "options": options
//     })

//     let xhr = new XMLHttpRequest()
//     xhr.open("POST", php_submit, true)
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
//     xhr.send("create=" + data)
// }

// Logic for selecting an existing opinion

function selectOpinion(index) {

}

// Logic for creating a new opinion

function createOpinion() {
    creationForm.style.display = 'block'
}

function removeOption() {

}