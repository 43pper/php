<?php
class HomePage extends Page{
    function __construct(){
        parent::__construct("Головна");
    }

    function getMain() : string{
        return '<main>
                    <div>ВІТАЄМО НА ГОЛОВНІЙ<br>
                    <a href="basket.php">перейти в кошик</a>
                    </div>
                </main>';
    }
}

?>
