// Files
let json_data = "js/data.json"

// Load the Visualization API and the corechart package.
google.charts.load('current', {
    'packages': ['corechart']
})

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(loadPollsAjax)

function loadPollsAjax() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseGraphData(JSON.parse(this.responseText))
        }
    }
    xhr.open("GET", json_data, true)
    xhr.send()
}

function parseGraphData(ajax) {
    var data = []
    ajax.polls.forEach(poll => {
        let options = poll.options

        options.forEach(option => {
            var count = 0
            let index = options.indexOf(option)
            
            poll.voters.forEach(voter => {
                if (voter.cast == index) count++
            })
    
            data.push(
                [option, count]
            )
        })
    })

    drawChart(data)
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(input) {

    // Create the data table.
    var data = new google.visualization.DataTable()
    data.addColumn('string', 'Topping')
    data.addColumn('number', 'Votes')
    data.addRows(input)

    // Set chart options
    var options = {
        'title': 'What is the best thing on pizza?',
        'width': 400,
        'height': 300,
        'legend': 'none'
    }

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'))
    chart.draw(data, options)
}