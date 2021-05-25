<?php
include 'index.php';
include_once 'session.php';

header("Content-Type: application/json; charset=UTF-8");

$json_data = "js/data.json";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    consoleLog("awesome");
    // Create a now poll to vote for. That poll gets saved at data.json
    if (isset($_POST["create"])) {
        $data = json_decode($_POST["create"], false);
        createNewPollInJson($data->header, $data->date, $data->time, $data->options);
    }
    
    // Vote for an existing poll
    if (isset($_POST["vote"])) {
        $data = json_decode($_POST["vote"], false);
        addNewVoteToPoll(0, $data->id, $data->cast);
    }
    
    // Vote for an existing poll
    if (isset($_POST["register"])) {
        $data = json_decode($_POST["register"], false);
        createUser($data->id, $data->password);
    }
    
    // Log our currently signed in user out
    if (isset($_POST["logout"])) {
        setSession();
    }
}

// ---- USER ---- //

function createUser(string $userId, string $password)
{
    if (getSession() != "") {
        echo "<script>console.log('info: username has already been set.')</script>";
        die;
    }

    setSession($userId);
    // echo "<script>console.log('info: username set to ".$_SESSION['username'].".')</script>";

    global $json_data;
    $data = json_decode(file_get_contents($json_data), true);

    // check if username has been taken
    foreach ($data['users'] as $user) {
        if ($user['id'] == $userId) {
            echo "<script type='text/javascript'>errorCode('info: username has already been set.')</script>";
            die;
        }
    }

    $data['users'][] = array(
        "id" => $userId,
        "password" => $password
    );

    file_put_contents($json_data, json_encode($data, JSON_PRETTY_PRINT));
}

// ---- POLL ---- //

function createNewPollInJson(string $pollTitle, string $date, string $time, array $pollOptions)
{
    global $json_data;
    $_options = array();
    
    foreach ($pollOptions as $value) {
        array_push($_options, array("choice" => $value));
    }
    
    // decode the json data into a php array
    $content = json_decode(file_get_contents($json_data), true);
    
    // add a new online poll
    $content['polls'][] = array(
        "creator" => "CREATOR",
        "password" => "PASSWORD",
        "date" => $date,
        "time" => $time,
        "header" => $pollTitle,
        "options" => $_options,
        "voters" => array()
    );
    
    // encode the array back into a json string and save it
    file_put_contents($json_data, json_encode($content, JSON_PRETTY_PRINT));
}

function addNewVoteToPoll(int $poll, string $voterId, int $voteCast)
{
    global $json_data;
    $content = json_decode(file_get_contents($json_data, true));
    
    // check if poll is not null
    if (!isset($content)) {
        consoleLog("error: data.json is null!");
        die;
    }
    
    // check if poll exists
    if (!isset($content->polls[$poll])) {
        consoleLog("error: data.json does not have a poll with index $poll!");
        die;
    }
    
    // check if option exists
    if (!isset($content->polls[$poll]->options[$voteCast - 1])) {
        $count = count($count = $content->polls[$poll]->options);
        consoleLog("error: data.json does not have a option of value $voteCast! (option count: $count)");
        die;
    }
    
    // check if user has not already voted
    foreach ($content->polls[$poll]->voters as $voter) {
        if ($voter->id == $voterId) {
            consoleLog("info: user has already voted for poll $poll");
            die;
        }
    }
    
    // add the new vote to the poll
    $content->polls[$poll]->voters[] = array(
        "id" => $voterId,
        "cast" => $voteCast
    );
    
    file_put_contents($json_data, json_encode($content, JSON_PRETTY_PRINT));
}

function consoleLog(string $input)
{
    echo "<script type='text/javascript'>console.log('$input')</script>";
}
