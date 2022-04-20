<?php
class HomePage extends Page{
    function __construct(){
        parent::__construct("Головна");
    }

    function getMain() : string{

        //база (АЗОВА) даних
        $products = [["firebird", "/img/firebird.jpg"], ["ganzo", "/img/ganzo.jpg"], ["truper", "/img/truper.jpg"]];

        $productsBlocks = "";
        for ($i = 0; $i < count($products); $i ++){
            $productsBlocks .= '<div class="row align-items-center">
                                    <div class="col-1">
                                        <input type="checkbox" class="form-check-input" name="'.$i.'_check">
                                    </div>
                                    <div class="col-3">
                                        <img src="'.$products[$i][1].'" alt="'.$products[$i][0].' picture">
                                    </div>
                                    <div class="col-5">
                                    '.$products[$i][0].'
                                    </div>
                                    <div class="col-3">
                                        <input type="number" class="form-control" name="'.$i.'_num" min="0" max="100" value="0">
                                    </div>
                                </div>';
        }

        return '<main>
                    <div>ВІТАЄМО НА ГОЛОВНІЙ<br>
                    <a href="/basket.php">перейти в кошик</a>
                    </div>
                    <form action="/buy.php" method="POST">
                        <div class="container">
                            '.$productsBlocks.'
                            <input type="submit" value="Купити">
                        </div>
                    </form>
                </main>';
    }
}
