<html>
<?php
class MainPage
{
    private string $html;
    function __construct(){
        $this->html = $this->getHead();
        $this->html.= $this->getBody();
    }

    function getHead() : string{
        return '
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KnivesPerfection</title>
</head>';
    }


    function getBody() : string
    {
        return '<body>
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

    function getPage(){
        echo $this->html;
    }
}

    $page = new MainPage();
    echo $page->getHead();
    echo $page->getBody();
?>

</html>
