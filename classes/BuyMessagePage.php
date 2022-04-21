<?php
class BuyMessagePage extends Page{
    function __construct(){
        parent::__construct("Покупка успішна");
    }

    function getMain() : string{
        return '<main class="bg-light">
                    <div class="container bg-white body_content"><h2>Покупку успішно додана до кошика</h2><br>
                    <a href="/basket.php" class="link-primary">Перейти в кошик</a>
                    </div>';

    }
}
