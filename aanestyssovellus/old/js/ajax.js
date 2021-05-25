let php_submit = "../submit.php"
let json_data = "js/data.json"

function displayUserLoginStatus(index = 0, input = "") {

    let nav = document.getElementById('top-nav')

    if (index == 0) {
        console.log('you need to login to create or vote on polls.')

        // login
        let login_form = document.createElement('div')
        login_form.innerHTML = `
            <form action="" method="post">
                <h4>Already have a profile? Log in:</h4>
                <input type="text" name="" id="c_name" placeholder="username...">
                <input type="password" name="" id="c_pass" placeholder="password...">
                <a type="button" id="account-login-btn">Log In</a>
            </form>
        `
        nav.appendChild(login_form)

        // register
        let register_form = document.createElement('div')
        register_form.innerHTML = `
            <form action="" method="post">
                <h4>Don't have a user? Create one:</h4>
                <input type="text" name="" id="c_name" placeholder="username...">
                <input type="password" name="" id="c_pass" placeholder="password...">
                <a type="button" id="account-create-btn">Create</a>
            </form>
        `
        nav.appendChild(register_form)

        document.getElementById('account-create-btn').addEventListener('click', function () {
            if (document.getElementById('c_name').value.length > 0) {
                if (document.getElementById('c_pass').value.length > 0) {
                    createUserAjax(document.getElementById('c_name').value, document.getElementById('c_pass').value)
                    return
                }
                console.log("you need to enter a password")
                return
            }
            console.log("you need to enter a username")
        })
    }
    else if (index == 1) {
        let form = document.createElement('div')
        form.innerHTML = `
            <h4>${input}</h4>
            <button id="logout-btn">Log out</button>
        `
        nav.appendChild(form)
        document.getElementById('logout-btn').addEventListener('click', function () { logoutUserAjax() })
    }
}

function createPollAjax(header, options) {
    let date = new Date()
    var data = JSON.stringify({
        "header": header,
        "date": `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
        "time": `${date.getHours()}.${date.getMinutes().length > 1 ? date.getMinutes() : "0" + date.getMinutes()}`,
        "options": options
    })

    let xhr = new XMLHttpRequest()
    xhr.open("POST", php_submit, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("create=" + data)
}

function createUserAjax(userId, password) {
    var data = JSON.stringify({
        "id": userId,
        "password": password
    })

    let xhr = new XMLHttpRequest()
    xhr.open("POST", php_submit, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("register=" + data)
}

function logoutUserAjax() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhrReady(this)) {
            console.log(this.responseText)
        }
    }
    xhr.open("POST", php_submit, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("logout")
}

function castPollVoteAjax(poll, voterId, cast) {
    var data = JSON.stringify({
        "poll": poll,
        "id": voterId,
        "cast": cast
    })

    let xhr = new XMLHttpRequest()
    xhr.open("POST", php_submit, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send("vote=" + data)
}

function loadPollsFromJsonAjax() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (!xhrReady(this)) return

        let data = JSON.parse(this.responseText)

        for (let i = 0; i < data.polls.length; i++) {
            let poll = data.polls[i]
            let x = i + 1

            let creator = poll.creator
            let header = poll.header
            let date = poll.date
            let time = poll.time
            let options = poll.options
            let voters = poll.voters

            var _options = ""
            for (let i = 0; i < options.length; i++) {
                if (i == 0) _options += "<h4>"
                _options +=
                    `${options[i].choice}`
                        + i == options.length - 1
                        ? "</h4>"
                        : " vs "
            }

            let poster = document.querySelector(".poll-poster")
            let div = document.createElement('div')
            div.setAttribute("id", "selectable-side-poll")
            div.innerHTML = `
                <h2>${x}. ${header}</h2>
                <h4>${creator} - ${time} - ${date}</h4>
                ${_options}
            `
            poster.appendChild(div)
        }
    }
    xhr.open("GET", json_data, true)
    xhr.send()
}

function xhrReady(xhr) {
    return xhr.readyState == 4 && xhr.status == 200
}