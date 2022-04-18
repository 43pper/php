<?php
class BasketPage extends Page{
    function __construct(){
        parent::__construct("Кошик");
    }
    
    function getMain() : string{
        return '<main>
                    <div>ВИ В КОШИКУ (СМІТНИКУ, ХАХА)</div>
                </main>';
    }
}
?>