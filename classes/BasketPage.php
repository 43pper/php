<?php
class BasketPage extends Page{
    function __construct(){
        parent::__construct("Кошик");
    }
    
    function getMain() : string{
        $returnString = '<main>
                    <div>ВИ В КОШИКУ (СМІТНИКУ, ХАХА)</div>
                    <div class="container">';
        session_start();
        if (isset($_SESSION["1_check"]) && $_SESSION["1_check"] == "on"){
            $num_1 = 0;
            if (isset($_SESSION["1_num"])) {
                $num_1  = $_SESSION["1_num"];
            }
            $returnString .='<div class="row align-items-center">
                                <div class="col-3">
                                    <img src="/img/firebird.jpg" alt="Firebird picture">
                                </div>
                                <div class="col-6">
                                firebird
                                </div>
                                <div class="col-3">
                                    '.$num_1.'
                                </div>
                            </div>';
        }
        if (isset($_SESSION["2_check"]) && $_SESSION["2_check"] == "on"){
            $num_2 = 0;
            if (isset($_SESSION["2_num"])) {
                $num_2  = $_SESSION["2_num"];
            }
            $returnString .='<div class="row align-items-center">
                                <div class="col-3">
                                    <img src="/img/ganzo.jpg" alt="Ganzo picture">
                                </div>
                                <div class="col-6">
                                ganzo
                                </div>
                                <div class="col-3">
                                    '.$num_2.'
                                </div>
                            </div>';
        }
        if (isset($_SESSION["3_check"]) && $_SESSION["3_check"] == "on"){
            $num_3 = 0;
            if (isset($_SESSION["3_num"])) {
                $num_3  = $_SESSION["3_num"];
            }
            $returnString .='<div class="row align-items-center">
                                <div class="col-3">
                                    <img src="/img/truper.jpg" alt="Truper picture">
                                </div>
                                <div class="col-6">
                                truper
                                </div>
                                <div class="col-3">
                                    '.$num_3.'
                                </div>
                            </div>';
        }
        return $returnString.'</div></main>';
    }
}