<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/megaphone.png" type="image/x-icon">
    <title>Epix Poll Creator</title>
    <script src="js/main.js"></script>
    <script src="js/ajax.js"></script>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <nav id="top-nav">
        <img src="../jp.svg" alt="my logo">
        <a href="http://it.esedu.fi/~pystynen.jere/">Jere Pystynen</a>

        <h1>Epic Polling Site</h1>
    </nav>

    <?php include_once 'session.php';?>

    <div id="ready-div"></div>
    
    <!-- other polls -->
    <button>Generate 10 new polls</button>
    <div class="poll-poster"></div>

    <div id="create-div">
        <a id="create-new-poll-btn" class="button2">+</a>
        <h3 class="hide">Create a new poll:</h3>
    </div>
    
    <div id="form-creation">
        
        <form id="vote-form" action="">
            
            <h2>Create a new poll:</h2>

            <a type="button" id="randomize-btn">Random</a>
            
            <input type="text" name="f-title" id="f-title" placeholder="Add a title (What is the best thing on pizza?)">
            
            <div id="f-options">
                <input type="text" name="f-opt-1" placeholder="Add option 1">
                <input type="text" name="f-opt-2" placeholder="Add option 2">
            </div>

            <div id="f-expire">
                <h3>Set to expire:</h3>
                <input type="date" id="appt" name="appt">
                <input type="time" id="appt" name="appt">
            </div>

            <a type="button" id="add-option-btn">Add a new option</a>
            <a type="button" id="confirm-btn">Confirm Poll</a>
            <a type="button" id="cancel-btn">Cancel</a>
        </form>
    </div>
</body>
<footer>
    <div id="error-message">
        
    </div>
</footer>
</html>