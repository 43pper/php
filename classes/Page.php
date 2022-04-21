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
                    <link href="styles/bootstrap.css" rel="stylesheet" type="text/css">
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
        return '<div class="header container-fluid sticky-top bg-white">
                    <header class="container d-flex flex-wrap justify-content-center py-3">
                        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <span class="fs-4">KnivesPerfection</span>
                        </a>
                        <a href="/basket.php" class="nav-link">Кошик</a>
                    </header>
                </div>';
    }

    function getFooter() : string{
        return '<div class="container-fluid bg-white text-center py-3 border-top">
                    2021
                </div>';
    }

    function getPage(){
        echo "<!doctype html><html lang = 'uk'>".$this->pageContent."</html>";
    }
}