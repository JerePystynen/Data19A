<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="openbook.png" type="image/x-icon">
    <title>Visitorbook (moderator)</title>
</head>
<style>
    * {
        font-family: sans-serif;
    }
    div, nav {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: Translate(-50%, -50%);
        background-color: gray;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 1rem;
        border: .3rem #262626 solid;
        border-radius: 1rem;
        margin-top: 2rem;
        padding: 3rem;
    }
    div {
    }
    nav {
        margin-top: 11%;
        padding-top: 2rem;
        padding-left: 5rem;
        padding-right: 5rem;
    }
    li {
        list-style-type: none;
    }
</style>
<script>
    let Messages = []
    window.onload = function() {
        loadXMLDoc()
    }

    async function loadXMLDoc() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;
                var x = xmlDoc.getElementsByTagName("message");
                Messages = []
                for (let i = 0; i < x.length; i++) {
                    let array = []
                    for (let y = 0; y < x[i].children.length; y++) {
                        array.push([x[i].children[y].textContent])
                    }
                    Messages.push(array)
                }
            }
        };
        xmlhttp.open("GET", "data.xml", true);
        xmlhttp.send();

        setTimeout(() => {
            for (let x = 0; x < Messages.length; x++) {
                var node = document.createElement("li")
                let array = [
                    `${Messages[x][1][0]} - `,
                    `"${Messages[x][0][0]}" - `,
                    `${Messages[x][2][0]}`
                ]
                for (let y = 0; y < array.length; y++) {
                    var textnode = document.createTextNode(array[y]);
                    node.appendChild(textnode);
                }
                document.getElementById("data").appendChild(node)
            }
        }, 100);
    }
</script>
<body>
    <div>
        <h1>Visitorbook moderator page</h1>
        <a href="index.php">return to main page</a>
    </div>
    <nav id="data">
        <h2>All written messages:</h2>
    </nav>
</body>
</html>