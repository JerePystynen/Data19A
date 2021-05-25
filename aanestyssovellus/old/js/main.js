/*
VERSION 1:
Sovelluksessa ei ole välttämätöntä käyttää tietovarastoa,
eli tietoja ei tallenneta ja sovellusta on tarkoitus käyttää yhdellä koneella.
Ts. äänestys luodaan ja sitä käytetään samalla koneella.

Käyttäjä luo äänestyksen, jolle antaa nimen
Tämän jälkeen käyttäjä luo äänestyksen kohteet, joita voi olla 2 tai enemmän
Sitten käyttäjä voi aloittaa äänestyssovelluksen, jonka jälkeen ei voi enää äänestystä muuttaa
Nyt käyttäjät voivat käydä äänestämässä haluamaansa vaihtoehtoa, ja äänestystulokset otetaan talteen
Jokaisen äänestyksen jälkeen näytetään muutama sekunti äänestyksen tuloksia numeroina
ja mahdollisesti graafisena kuvaajana, kunnes palataan takaisin äänestysnäkymään
Kun kaikki äänet on annettu, voidaan äänestys lopettaa ja tulokset näytetään ruudulla
Tämän jälkeen voidaan aloittaa uusi äänestys ja tulokset nollataan
Tulosten ei tarvitse jäädä muistiin nollauksen jälkeen.

VERSION 2:
Toteuta selainkäyttöinen sovellus, johon käyttäjällä on mahdollisuus luoda.
Äänestykset pitää tallentaa tietovarastoon ja äänestyksiä pitää voida selata ja äänestää selaimella.

Ohjelman toiminta on seuraava:
    Käyttäjä luo äänestyksen, jolle antaa nimen ja näkyvyys ajan. Eli äänestys on näkyvissä käyttäjän määrittelemän ajan.
    Tämän jälkeen käyttäjä luo äänestyksen kohteet, joita voi olla 2 tai enemmän
    Käyttäjä voi jälkeen päin poistaa ja muokata äänestyksiä. Nämä toiminnot pitää voida suojata salasanalla.
    Äänestyksen tiedot tallennetaan tietokantaan.
    Muut käyttäjät voivat selata luotuja äänestyksiä
    He voivat valita haluamansa äänestyksen ja äänestää kerran.
    He voivat myös nähdä äänestyksen tilanteen.

Kaikenlaisia ideoita voi lisätä ja kehittää, esim äänet, animointi yms.
*/

/*
    ainoat erot versioissa:
    - versio 1: ei voi muokata poll luonnin jälkeen
    - versio 1: ei tallenna käyttäjää eikä poll session lopetuksen jälkeen
*/


//THE PROCESS:
// 1.create ajax call at test.php
// 2.test.php parses that call and adds into data.json accordingly

/*
    Form's array's datastructure
    [
        [[a,0], [b,1], [c,2], [d,0], [e,3]] vote names with vote counts
        [0] current vote index (-1 if none)
        [inputs]
        [texts]
        [graph]
    ]
*/

let allowReVotes = true
let allowReEdit = true
let showVoteCount = false
let useGraph = true

let useGhostVotes = true
let filler = ["pineapple", "tuna", "avocado", "salami", "oregano", "sushi", "shrimp"]

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var calendar

// used in version 2
let saveToDatabase = true

var optionCount = 2
var forms_array = []
var form_options, form_title, pollform, create_btn, ready_div, header

// AUDIO
let audio = new Audio()
let sfx_click = ['0.wav', '1.wav', '2.wav', '3.wav', '4.wav', '5.wav', '6.wav', '7.wav', '8.wav', '9.mp3', '10.mp3']
let sfx_create = ['0.wav', '1.wav', '2.mp3', '3.mp3', '4.mp3', '5.mp3']

function getRandomClickSfx() { return 'sfx/click/' + sfx_click[Math.round(sfx_click.length * Math.random())] }
function getRandomCreateSfx() { return 'sfx/create/' + sfx_create[Math.round(sfx_create.length * Math.random())] }

window.onload = function () {
    form_options = document.getElementById("f-options")
    form_title = document.getElementById("f-title")
    // header = document.getElementById("header-txt")

    pollform = document.getElementById("vote-form")
    ready_div = document.getElementById("ready-div")

    create_btn = document.getElementById("create-new-poll-btn")

    create_btn.addEventListener("click", function () { createPoll() })
    document.getElementById("add-option-btn").addEventListener("click", function () { addOption() })
    document.getElementById("confirm-btn").addEventListener("click", function () { confirmPoll() })
    document.getElementById("cancel-btn").addEventListener("click", function () { setVisibility(2) })

    setVisibility(2)
    // createCalendar()
    // setCalendateVisibility(false)

    loadPollsFromJsonAjax()
}

// function createCalendar() {
//     calendar = document.getElementsByClassName("calendar")[0]

//     var dt = new Date()
//     var d = dt.getDate()
//     var z = d==1 ? "st": d==2 ? "nd": d==3 ? "rd": "th"
//     var date = `${d}${z} of ${months[dt.getMonth()]}`
//     // document.write(date)

//     // create empty days for the month's first day before starting calendar
//     for (let i = 1; i < new Date(dt.getFullYear(), dt.getMonth(), 1).getDay(); i++) { //skip_days
//         let _date = document.createElement("div")
//         calendar.getElementsByClassName("calendar__date")[0].appendChild(_date)
//     }

//     // create calendar's dates
//     for (let i = 1; i <= new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate(); i++) { //date_count
//         let _date = document.createElement("div")
//         _date.class = "calendar__number"
//         _date.innerHTML = `${i}`
//         calendar.getElementsByClassName("calendar__date")[0].appendChild(_date)
//     }
// }

function setCalendateVisibility(value) {
    calendar.style.display = value ? "block" : "none";
}

function createPoll() {
    setVisibility(1)

    if (useGhostVotes) {
        form_title.value = "What is the best thing on pizza?"
        for (let i = 0; i < form_options.children.length; i++)
            form_options.children[i].value = filler[Math.round(Math.random() * filler.length)]
    }
}

function addOption() {
    //you can add new options if both inputs are filled
    if (form_options.children[0].value == "" || form_options.children[1].value == "")
        return

    if (optionCount > 2)
        if (form_options.children[optionCount - 1].children[0].value == "")
            return

    optionCount++
    let input = document.createElement("div")
    input.id = "option"
    input.type = "text"
    input.innerHTML = `
        <input type="text" placeholder="Add option ${optionCount} ${filler[Math.round(filler.length * Math.random())]}...">
        <a id="rem" onclick="removeOption(this.parentNode)">-</a>
    `
    form_options.appendChild(input)
}

function removeOption(x) {
    x.remove()
    optionCount--
    for (let i = 2; i < optionCount; i++) {
        form_options.children[i].children[0].placeholder = `Add option ${i + 1}...`
    }
}

function confirmPoll() {
    let _title = ""
    if (form_title.value == "") {
        errorCode("The poll requires a title.")
        return
    }
    _title = form_title.value

    var _inputOptions = []
    for (let i = 0; i < optionCount; i++) {
        if (i < 2) {
            if (form_options.children[i].value == "") {
                errorCode("The first 2 options need to be filled.")
                return
            }
            _inputOptions.push(form_options.children[i].value)
            continue
        }
        if (form_options.children[i].children[0].value != "") {
            _inputOptions.push(form_options.children[i].children[0].value)
        }
    }

    var _vote = document.createElement("div")
    _vote.id = "vote-form"
    _vote.innerHTML = `
        <form action="" id="vote-${forms_array.length - 1}">
            <h1>${_title}</h1>
            <div id="choices"></div>
        </form>`
    document.getElementById("ready-div").appendChild(_vote)

    let _graph = document.createElement("canvas")
    _graph.style.display = "none"
    _graph.id = "graph"
    _vote.appendChild(_graph)

    let arr1 = new Array()
    let _inpts = new Array()
    let _texts = new Array()
    for (let i = 0; i < _inputOptions.length; i++) {
        let __option = document.createElement("div")
        __option.setAttribute("id", "option")
        __option.innerHTML = `
            <h3>${_inputOptions[i]}</h3>
            <input type="radio" value="${i}" onclick="selectOption(${i}, this.parentNode.parentNode, ${forms_array.length}, this.parentNode)">
            <h3 id="num">{num}</h3>
        `
        _inpts.push(__option.querySelector('input[type="radio"]'))
        _texts.push(__option.querySelector("#num"))
        _vote.appendChild(__option)
        
        //vote with its corresponding vote count
        let arr3 = [_inputOptions[i], 0]
        
        arr1.push(arr3)
    }

    let arr2 = new Array()
    arr2.push(arr1)
    
    // user's own vote index
    arr2.push(-1)
    
    // field's inputs
    arr2.push(_inpts)
    
    // field's texts
    arr2.push(_texts)
    
    // field visualised
    arr2.push(_graph)
    
    forms_array.push(arr2)

    // hide away text elements
    setNumsDisplay(_texts, false)
    
    setVisibility(0)

    createPollAjax(_title, _inputOptions)

    // play poll creation audio effect
    audio.src = getRandomCreateSfx()
    audio.play()
}

function selectOption(x, y, z, w) {
    let _opts = y.children
    for (let i = 0; i < _opts.length; i++)
        _opts[i].checked = _opts[i].value == x

    //if user has already voted or if user has already checked this one
    if ((!allowReVotes && forms_array[z][1] >= 0) || forms_array[z][1] == x) return
    forms_array[z][1] = x //user's vote

    //all votes in the form summed up
    let _votes = 0
    
    //for each option in the poll
    for (let i = 0; i < forms_array[z][3].length; i++) {
        if (i == x) forms_array[z][0][x][1]++
        
        let _vote = forms_array[z][0][i][1]
        _votes += _vote
        
        let _pro = _vote > 0
            ? Math.round((_vote / _votes) * 100)
            : 0
        
        forms_array[z][3][i].innerHTML = forms_array[z][0][i][1] > 0
            ? showVoteCount ? `${_vote} - ${_pro}%` : `${_pro}%`
            : "0%"
    }

    forms_array[z][2].forEach(e => { e.disabled = !allowReVotes })
    setNumsDisplay(forms_array[z][3], true)
    displayPollGraph()
    if (allowReVotes) setTimeout(() => { deleteForm(z) }, 3000)
}

function displayPollGraph() {
    if (!useGraph) return
    
    let canvas = forms_array[z][4]
    canvas.style.display = "block"
    let ctx = canvas.getContext("2d")

    let width = 40
    let X = 50

    ctx.fillStyle = "#008080"

    for (let i = 0; i < forms_array[0].length; i++) {
        let h = forms_array[0][i][1]
        ctx.fillRect(X, canvas.height - h, width, h)
        X += width + 15
    }
}

function setNumsDisplay(num, value) {
    num.forEach(e => { e.style.display = value ? "block" : "none" })
    return 1
}

function setVisibility(x) {
    let _headerCreateBtn = ['none', 'none', 'block']
    let _pollForm = ['none', 'block', 'none']
    
    create_btn.style.display = _headerCreateBtn[x]
    pollform.style.display = _pollForm[x]
    
    if (x == 0) clearForm()
}

function clearForm() {
    for (let i = 0; i < form_options.children.length; i++) {
        if (i < 2) {
            form_options.children[i].value = ""
            continue
        }
        form_options.children[i].remove()
    }
    optionCount = 2
    form_title.value = ""
}

function deleteForm(x) {
    if (ready_div.children.length <= 0) return
    
    ready_div.removeChild(ready_div.children[x])
    forms_array.splice(x, 1)
    
    setVisibility(2)
}

function errorCode(msg) {
    let mes = document.getElementById('error-message')
    
    // show error message for 4 seconds
    setTimeout(() => {
        mes.style.display = "block"
        mes.innerText = msg
    }, 4000)
    
    mes.style.display = "none"
}