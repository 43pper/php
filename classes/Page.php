<?php
class Page
{
    private string $pageContent;
    private string $title;
    
    function __construct($title){
        $this->title = $title;
        $this->pageContent = $this->getHead().$this->getBody();
    }

    function getHead() : string{
        return '<head>
                    <meta charset="UTF-8">
                    <meta name="viewport"
                        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link href="styles/style.css" rel="stylesheet" type="text/css">
                    <title>'.$this->title.'</title>
                    '.$this->getScripts().'
                </head>';
    }

    function getScripts() : string{
        return "";
    }

    function getBody() : string{
        return '<body>'.$this->getHeader().$this->getMain().$this->getFooter().'</body>';
    }
    
    function getMain() : string{
        return '<main>
                    <div>ТІЛО</div>
                </main>';
    }

    function getHeader() : string{
        return '<header>
                    <div><a href="index.php">додому</a></div>
                    <div>ГОЛОВА</div>
                </header>';
    }

    function getFooter() : string{
        return '<footer>
                    <div>НОГИ</div>
                </footer>';
    }

    function getPage(){
        echo "<html>".$this->pageContent."</html>";
    }
}
?>