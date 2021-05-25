var playerCount = 1
var diceCount = 2

let sliders = document.getElementsByClassName('start-slider')
Array.prototype.forEach.call(sliders, function (e) {
    let slider = e.getElementsByClassName('slider')[0]
    let txt = e.getElementsByClassName('txt')[0]
    switch (slider.name) {
        case "players":
            slider.value = playerCount
            txt.innerHTML = playerCount
            break
        case "dice":
            slider.value = diceCount
            txt.innerHTML = diceCount
            break
    }
    slider.oninput = function () {
        txt.innerHTML = this.value
        switch (slider.name) {
            case "players":
                playerCount = slider.value
                break
            case "dice":
                diceCount = slider.value
                break
        }
    }
})

function throwDice() {

}