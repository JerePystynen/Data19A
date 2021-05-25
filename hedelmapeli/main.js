// Toteuta JavaScriptillä perinteinen hedelmäpeli, jossa on tavoitteena saada tiettyjä kuviosarjoja. 
// Vaatimuksena on, että pelissä on kolme arvottavaa rullaa

// Kun peli alkaa on pelaajalla tietty määrä pelirahaa, joita käytetään jokaisella pelikierroksella. 
// Pelirahasta voi käyttäjä valita pelikierroksella käytettävän panoksen. 
// Kun peli arpoo käyttäjälle voittosarjan, lisätään voitot rahamäärään. 
// Peli loppuu, kun peliraha loppuu

Element.prototype.getElementById = function(id) {
    return document.getElementById(id);
}
Node.prototype.chainableAppendChild = function(child) {
    this.appendChild(child)
    return this
}

let questionFruit = 'fruit-questionmark.png'
let fruits = ['melon.png', 'pear.png', 'apple.png', 'cherry.png'],

Shape1 = ['melon', 'melon', 'cherry', 10],
Shape2 = ['cherry', 'melon', 'apple', 10]

// Variables
var balance = 0
var betAmount = 0 
var depoAmount
var rolling = false

// for each extra row over 3 add 5€ to bet cost
var rowAmount = 3       // 3
var rollRate = 0.3      // smaller number means quicker
let rollDelay = 0.01    // 0.01
var direction = true    // true = top to bottom

var LockButtons = []
var Locked = []

// Elements
var Rolls
var balanceText
var betamountText

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async function() {
    balanceText = document.getElementById("balance-text")
    betamountText = document.getElementById("betamount-text")

    roll_btn = document.getElementById("mbtn-a")

    Rolls = document.getElementById("Rolls")
    CreateSlots(rowAmount - Rolls.children.length)

    for (let i = 0; i < Rolls.children.length; i++) { //foreach horizontal row
        LockButtons.push(Rolls.children[i].children[2]) //get the lock button
        Locked.push(false)
    }
    for (let i = 0; i < LockButtons.length; i++) { //set those slots' lock state to default 
        Lock(LockButtons[i].parentNode)
        Lock(LockButtons[i].parentNode)
    }
    for (let i = 0; i < Rolls.children.length; i++) { //set slot images
        for (let y = 0; y < Rolls.children[i].children[1].children.length; y++) {
            Rolls.children[i].children[1].children[y].src = questionFruit
        }
    }

    for (let i = 1; i < wincombos.length; i++) {
        var ccombo = document.createElement("div")
        ccombo.id = "tier"
        ccombo.innerHTML =
        `<div id="combo">
            <img src="${wincombos[i][0][0]}.png">
            <img src="${wincombos[i][0][1]}.png">
            <img src="${wincombos[i][0][2]}.png">
        </div>
        <div id="reward">
            <h1>${wincombos[i][1]}</h1>
            <img src="coin-nbg.png">
        </div>`
        document.getElementById("reward-tiers").appendChild(ccombo)
    }

    CheckBalance()
}

function CreateSlots(x) {
    for (let i = 0; i < x; i++) {
        var element = document.createElement("div")
        element.id = "Slot"
        element.innerHTML = Rolls.children[0].innerHTML;
        Rolls.appendChild(element)
    }
}

function AddMoney(x) {
    balance += x
    CheckBalance()
}

async function Roll() { // Rullat pyörähtävät liikkeelle kun painetaan nappia
    if (CheckBalance()) balance -= betAmount
    CheckBalance()
    rolling = true
    PullLever()
    Bet(-9999)
    await sleep(250)

    var q = Rolls.children // roll every row
    for (var x = 0; x < q.length; x++) { // for each horizontal row
        var r = q[x].children[1].children //row's slots
        if (!Locked[x]) { //if row is not locked
            RollRow(r)
            await sleep(1250)
        }
    }
    await sleep(2000)
    // take the result
    var result = new Array()
    for (var x = 0; x < q.length; x++) { // for each horizontal row
        // result.push("Row " + x)
        var s = q[x].children[1].children
        
        // for (y = 0; y < s.length; y++) { // for each image in vertical row
        //     var imgname = s[y].src.split("/").pop().split(".")[0]
        //     result.push([imgname])
        // }
        
        var imgname = s[2].src.split("/").pop().split(".")[0]
        result.push(imgname.toString().toLowerCase())
    }
    Result(result) // Kun kuvat on arvottu ohjelma kertoo, saadaanko sillä voittoa
}
async function PullLever() { //plays animation for pulling lever
    var lever = document.getElementById("roll-lever")
    for (let i = 0; i < 10; i++) {
        lever.style.transform = `rotate(${i*9}deg)`
        await sleep(10)
    }
    for (let i = 10; i >= 0; i--) {
        lever.style.transform = `rotate(${i*9}deg)`
        await sleep(20)
    }
}
async function RollRow(r) { //starts rolling specified row
    for (var u = 0; u < 50; u++) {
        if (direction) { // FROM UP TO DOWN
            for (var s = r.length-1; s > 0; s--) {
                r[s].src = r[s-1].src
                await sleep((rollDelay * u / 13) * rollRate)
            }
            r[0].src = RandomFruit(r[2].src)

        } else { // FROM DOWN TO UP
            for (var s = 0; s < r.length-1; s++) {
                r[s].src = r[s+1].src
                await sleep((rollDelay * u / 13) * rollRate)
            }
            r[r.length-1].src = RandomFruit(r[2].src)
        }   
    }
}
function RandomFruit(i) { // i = absolute path to the img, remove everything before the name
    var w = Math.round(Math.random() * (fruits.length -1))
    while (i == fruits[w]) w = Math.round(Math.random() * (fruits.length -1))
    return fruits[w]
}
function Result(result) {
    rolling = false
    //to-do:...
    //add combo-ing and give player money back... nah, i don't get paid for this...
    //lisää voittolinjat 1-5
    
    for (let i = 0; i < wincombos.length; i++) {
        if (result.equals(wincombos[i][0])) {
            alert(`Great! you won ${wincombos[i][1]} coins!`)
            AddMoney(wincombos[i][1])
            break
        } else {
            //you didn't win :(
        }
    }
}

var wincombos = [
    [["apple", "apple", "apple"], 12],
    [["melon", "melon", "melon"], 12],
    [["pear", "pear", "pear"], 12],
    [["cherry", "cherry", "cherry"], 12],

    [["apple", "apple", "cherry"], 5],
    [["cherry", "cherry", "apple"], 7],
    [["melon", "cherry", "cherry"], 20],
    [["apple", "cherry", "cherry"], 6],
    [["cherry", "pear", "cherry"], 15],
    [["melon", "apple", "cherry"], 20],
    [["apple", "melon", "pear"], 50],
]

//https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// function ChangeDeposit(i) {
//     if (i == 'zero' || (parseInt(document.getElementById("Deposit_Input").value) + i) < 0) {
//         document.getElementById("Deposit_Input").value = 0
//     } else {
//         document.getElementById("Deposit_Input").value = parseInt(document.getElementById("Deposit_Input").value) + i
//     }
//     CheckDeposit()
// }
// function Deposit() {
//     balance += parseInt(document.getElementById("Deposit_Input").value)
//     document.getElementById("Deposit_Input").value = 0
//     CheckBalance()
//     CheckDeposit()
// }
// function CheckDeposit() {
//     depoAmount = document.getElementById("Deposit_Input").value
//     document.getElementById("deposit-btn").disabled = (depoAmount > 0)
    
//     // if (depoAmount > 0) {
//     // } else {
//     //     document.getElementById("deposit-btn").disabled = true
//     // }
// }

function Bet(i) {
    if (i == 'all' || (betAmount + i) > balance) {
        betAmount = balance
    } else if (i == 'zero' || (betAmount + i) <= 0) {
        betAmount = 0
    } else {
        betAmount += i
    }

    CheckBalance()
}

var roll_btn

function CheckBalance() {
    balanceText.innerHTML = "Money: " + (balance) + "€"
    betamountText.innerHTML = "Bet: " + (betAmount) + "€"

    if (balance > 0) { // if player has any money
        if ((balance - betAmount) >= 0 && betAmount > 0) {
            roll_btn.disabled = false
            roll_btn.style.backgroundColor = "rgb(102, 167, 82)"
            return true
        } else {
            roll_btn.disabled = true
            roll_btn.style.backgroundColor = "rgb(0,0,0)"
            return false
        }
    } else {
        betamountText.innerHTML = "Bet: " + (balance) + "€"
        roll_btn.disabled = true
        roll_btn.style.backgroundColor = "rgb(0,0,0)"

        return false
        // End game and require player to deposit more money in order to continue
        
        // ...
        
    }
}

function Lock(slot) {
    if (!rolling) {
        var x = Array.prototype.indexOf.call(slot.parentNode.children, slot);
        let src = slot.parentNode.children[x].children[1].children[0].src
        src = src.split("/").pop().split(".")[0]
        if (src != "fruit-questionmark") {
            if (Locked[x] == false) {
                Locked[x] = true
                LockButtons[x].style.backgroundColor = "black";
                slot.style.backgroundColor = "rgb(0,0,0)"
                // for (let i = 0; i <  slot.parentNode.children[x].children[0].children.length; i++) //show masks
                    // slot.parentNode.children[x].children[0].children[i].style.display = "block"
            } else {
                Locked[x] = false
                LockButtons[x].style.backgroundColor = "white";
                slot.style.backgroundColor = "rgb(51, 14, 99)"
                // for (let i = 0; i <  slot.parentNode.children[x].children[0].children.length; i++) //hide masks
                    // slot.parentNode.children[x].children[0].children[i].style.display = "none"
            }
            var l = 0;
            for (let i = 0; i < Locked.length; i++) if (Locked[i] == true) l++;
            roll_btn.disabled = (l >= LockButtons.length) //if all slots are locked, disable rolling
        }
    }
}

//Modifier buttons
var warningNum = 0
function ChangeRow(x) { //adds or removes horizontal rows
    if (warningNum == 0) { ShowWarning(); return }
    if ((row + x) <= 0) rowAmount = 0
    else rowAmount += x
}
function ChangeDirection() {
    if (warningNum == 0) { ShowWarning(); return }
    direction = !direction
}
function ShowWarning() {
    alert("These are modifier buttons. Are you sure you want to change how Fruit Game functions? Altering functionality may cause bugs.")
    warningNum++
}