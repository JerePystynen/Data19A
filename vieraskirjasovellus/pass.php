<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="openbook.png" type="image/x-icon">
    <title>Authentication Required</title>
</head>
<style>
    * {
        font-family: sans-serif;
    }
    form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: Translate(-50%, -50%);
        background-color: gray;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 1rem;
        border: .3rem #262626 solid;
        border-radius: 1rem;
        margin-top: 2rem;
    }
</style>
<body>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>?p=login" method="post">
    <h2>Authentication Required</h2>
    <p>You need to enter a password to access the admin page.</p>
    <input type="password" name="keypass" id="keypass" autocomplete="new-password" placeholder="Enter password...">
    <input type="submit" id="submit" value="Login">
</form>
</body>
</html>
<?php
$password = "ipsum";
$nonsense = "supercalifragilisticexpialidocious";
if (isset($_GET['p']) && $_GET['p'] == "login") {
    if ($_POST['keypass'] != $password) {
        echo "Sorry, that password does not match.";
        echo "<script type='text/javascript'>alert(''Wrong Password'!')</script>";
        test();
        exit;
    } else if ($_POST['keypass'] == $password) {
        setcookie('PrivatePageLogin', md5($_POST['keypass'].$nonsense));
        // header("Location: $_SERVER[PHP_SELF]");
        $url = dirname($_SERVER['PHP_SELF']) . "/moderator.php";
        header("Location: $url");
    } else {
        echo "Sorry, you could not be logged in at this time.";
    }
}
function test() {
    sleep(2);
    $url = dirname($_SERVER['PHP_SELF']) . "/index.php";
    header("Location: $url");
}
?>