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
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link href="styles/style.css" rel="stylesheet" type="text/css">
                    <link href="styles/bootstrap.css" rel="stylesheet" type="text/css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
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
                    <div><a href="/index.php">додому</a></div>
                    <div>ГОЛОВА</div>
                </header>';
    }

    function getFooter() : string{
        return '<footer>
                    <div>НОГИ</div>
                </footer>';
    }

    function getPage(){
        echo "<!doctype html><html lang = 'uk'>".$this->pageContent."</html>";
    }
}