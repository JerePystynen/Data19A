<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../jp.svg" type="image/x-icon">
    <title>36 - Äänestyssovellus</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="section" id="side-panel">
        <div id="title">
            <img src="img/m-icon.png">
            <h1>Munkin Mielipide</h1>
        </div>
        <div id="content">
            <div class="op">
                <h3>Kuuluuko ananas pitsaan?</h3>
            </div>
        </div>
    </div>
    <div class="section" id="container">
        <div id="top">
            <h2>Et ole kirjaunut sisään.</h2>
            <h2>Olet kirjaunut sisään, Matti Meikäläinen.</h2>
        </div>
        <form class="creation-form" action="POST">
            <h2>Luo uusi Mielipide:</h2>
            <input type="text" name="" id="title" placeholder="Lisää mielipiteen otsikko...">
            <div id="options">
                <h3 id="subtitle">Vaihtoehtoja pitää olla vähintään 2kpl.</h3>
                <div>
                    <input type="text" name="" id="" placeholder="Valinta 1...">
                    <button type="button">X</button>
                </div>
                <div>
                    <input type="text" name="" id="" placeholder="Valinta 2...">
                    <button type="button">X</button>
                </div>
                <button id="add-btn" type="button">+ Uusi valinta</button>
            </div>
            <div id="timer">
                <h3>Näkyvyysaika:</h3>
                <input type="date" name="" id="">
            </div>
            <button type="submit">Luo mielipide</button>
        </form>
        <button id="form-start-btn">Luo uusi mielipide</button>
    </div>
</body>
<script src="main.js"></script>
</html>
<?php
    // load all opinions from data/opinions.json
?>