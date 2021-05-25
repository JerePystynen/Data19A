<!-- Laitoin kaikki tiedostot tähän yksinkertaisuuden puolesta -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="openbook.png" type="image/x-icon">
    <title>XML-Visitorbook</title>
</head>
<script>
    let Messages = []
    window.onload = function() {
        document.getElementById("p-btn").addEventListener("click", function() { SetReview("-") })
        document.getElementById("r-btn").addEventListener("click", function() { SetReview("r") })
        document.getElementById("n-btn").addEventListener("click", function() { SetReview("+") })
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
                    if (x[i].children[3].textContent == "false") {
                        let array = []
                        for (let y = 0; y < x[i].children.length; y++) {
                            array.push([x[i].children[y].textContent])
                        }
                        Messages.push(array)
                    }
                }
            }
        };
        xmlhttp.open("GET", "data.xml", true);
        xmlhttp.send();

        setTimeout(() => {
            SetReview(0);
        }, 200);
    }

    let currFeed = 0;
    function SetReview(x) {
        if (x == "+") {
            if (currFeed < Messages.length-1) currFeed++
            else currFeed = 0
        }
        else if (x == "-") {
            if (currFeed > 0) currFeed--
            else currFeed = Messages.length-1
        }
        else if (x == "r") {
            currFeed = RandomNum(0, Messages.length-1)
        }
        else currFeed = x

        document.getElementById("data").innerHTML = `"${Messages[currFeed][0]}"`
        document.getElementById("bar").innerHTML = `${Messages[currFeed][1]} - ${Messages[currFeed][3]}`
        document.getElementById("num").innerHTML = `${currFeed+1}/${Messages.length}`
    }
    function RandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
</script>
<style>
    * {
        font-family: sans-serif;
    }
    nav {
        position: absolute;
        left: 50%;
        transform: Translate(-50%, 20%);
    }
    div:nth-of-type(1) {
        margin-top: 2rem;
    }
    div:nth-of-type(2) {
        margin-top: 4rem;
    }
    div {
        position: relative;
        background-color: gray;
        padding: 1.1rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border: .3rem #262626 solid;
        border-radius: 1rem;
        margin-top: 2rem;
    }
    input {
        width: 20rem;
        display: grid;
        margin: 1rem;
    }
</style>
<body>
<nav>
    <div>
        <h1>Visitorbook Index</h1>
        <a href="pass.php">Go to moderator page</a>
    </div>
    <div>
        <h1>All written Messages visible for mere mortals:</h1>
        <p id="data">[text]</p>
        <p id="bar">[name] - [date]</p>

        <button id="p-btn"><</button>
        <button id="r-btn">R</button>
        <button id="n-btn">></button>
        <p id="num">0/0</p>
    </div>
    <div>
        <h1>Write your own Message:</h1>
        <form method="post">
            Enter Your Message Here:<br>
            <input type="text" name="ftext" placeholder="Your message..." autocomplete="off">
            <input type="text" name="fname" placeholder="Your username..." autocomplete="off">
            <p>Secure your message?:</p>
            <input type="checkbox" name="fsecu" id="fsecu">
            <input type="submit" name="submit">
        </form>
    </div>
</nav>
</body>
</html>
<?php
if (isset($_POST['submit'])) {
    $data = $_POST['ftext'];
    if ($data == "") return;
    $name = $_POST['fname'];
    if ($name == "") return;
    $secu = "false";
    if (isset($_POST['fsecu'])) $secu = "true";

    $date = date("F d, Y h:i:s A");

    $file = "data.xml";
    if (!file_exists($file)) touch($file);
    $xml = new DOMDocument("1.0", "UTF-8");
    $xml->preserveWhiteSpace = falsE;
    $xml->formatOutput = true;
    clearstatcache();
    if (filesize($file)) $xml->load($file);
    
    $container = $xml->getElementsByTagName('container')[0];
    if (!isset($container)) {
        $container = $xml->createElement("container");
        $container = $xml->appendChild($container);
    }
    
    $review = $container->appendChild($xml->createElement("message"));
    $review->appendChild($xml->createElement("text", $data));
    $review->appendChild($xml->createElement("name", $name));
    $review->appendChild($xml->createElement("date", $date));
    $review->appendChild($xml->createElement("secured", $secu));

    $output = $xml->saveXML();
    $xml->save($file);

    echo "<script type='text/javascript'>alert('Message saved!')</script>";
}
?>