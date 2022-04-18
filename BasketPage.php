<?php
class BasketPage extends Page{
    function __construct(){
        parent::__construct("Кошик");
    }
    function getMain() : string{
        return '<main>
                    <div>ТІЛО ПОКРУЧЄ</div>
                </main>';
    }
}
?>