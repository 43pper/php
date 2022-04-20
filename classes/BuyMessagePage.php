<?php
class BuyMessagePage extends Page{
    function __construct(){
        parent::__construct("Покупка успішна");
    }

    function getMain() : string{
        return '<main>
                    <div>Покупка успішно додана до кошика<br>
                    <a href="/basket.php">перейти в кошик</a>
                    </div>';

    }
}
