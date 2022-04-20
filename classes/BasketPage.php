<?php
class BasketPage extends Page{
    function __construct(){
        parent::__construct("Кошик");
    }
    
    function getMain() : string{
        session_start();

        $returnString = '<main>
                    <div>ВИ В КОШИКУ (СМІТНИКУ, ХАХА)</div>
                    <div class="container">';

        $products = [["firebird", "/img/firebird.jpg"], ["ganzo", "/img/ganzo.jpg"], ["truper", "/img/truper.jpg"]];

        if (count($_SESSION) <= count($products)){
            return $returnString.'<a href="/index.php">Перейти до покупок</a></div></main>';
        }

        for ($i = 0; $i < 3; $i++){


            $i_check = $i."_check";
            $i_num = $i."_num";

            if (isset($_SESSION[$i_check]) && $_SESSION[$i_check] == "on"){

                $num = 0;
                if (isset($_SESSION[$i_num])) {
                    $num  = $_SESSION[$i_num];
                }

                $returnString .='<div class="row align-items-center">
                                <div class="col-3">
                                    <img src="'.$products[$i][1].'" alt="'.$products[$i][0].' picture">
                                </div>
                                <div class="col-6">
                                '.$products[$i][0].'
                                </div>
                                <div class="col-3">
                                    '.$num.'
                                </div>
                            </div>';
            }
        }
        return $returnString.'</div></main>';
    }
}