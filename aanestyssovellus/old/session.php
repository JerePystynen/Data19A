<?php
if (!isset($_SESSION['username'])) {
    echo "<script type='text/javascript'>displayUserLoginStatus()</script>";
} else {
    $var = 'Hello '.$_SESSION['username'].'. you are logged in.';
    echo "<script type='text/javascript'>displayUserLoginStatus(1, '$var');</script>";
}

function getSession() : string {
    return strval($_SESSION['username']);
}

function setSession($id = "") {
    if ($id == "") {
        unset($_SESSION['username']);
        return;
    }
    $_SESSION['username'] = $id;
}
?>