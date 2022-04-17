<html>

<?php
class generatePage{
    function __constructor(){
        $this->getHead();
        $this->getBody();
    }

    function getHead(){
        echo '<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KnivesPerfection</title>
</head>';
    }

    function getBody(){
        echo '<body>
    <header>
        <div>ГОЛОВА</div>
    </header>
    <main>
        <div>ТІЛО</div>
    </main>
    <footer>
        <div>НОГИ</div>
    </footer>

</body>';
    }
}

?>

</html>
