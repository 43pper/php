<?php
class BasketPage extends Page{
    function __construct(){
        parent::__construct("Кошик");
    }
    
    function getMain() : string{


        $returnString = '
                <script>
                    function Delete(i) {
                        if (confirm("Видалити товар з кошика?")) {
                            fetch("/delete.php",{
                              method: "POST",
                              body: JSON.stringify(
                                  {
                                    id: i
                                  }
                              )  
                            }).then((response) => {
                                return response.text();
                            }).then((html) => {
                                document.body.innerHTML = html     
                            });
                            }
                    }
                </script>
                <main class="bg-light">

                    <div class="container bg-white body_content">
                    <!---<div class="bg-white">ВИ В КОШИКУ (СМІТНИКУ, ХАХА)</div>!--->
                    <h1 class="display-4">Кошик</h1>
                    <table class="table table-bordered align-middle text-center">
                    <thead>
                        <tr>
                            <th scope="col" class="col-1">№</th>
                            <th scope="col" class="col-2"></th>
                            <th scope="col" class="col-5">Назва</th>
                            <th scope="col" class="col-1">Кількість</th>
                            <th scope="col" class="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ';

        $products = [["firebird", "/img/firebird.jpg"], ["ganzo", "/img/ganzo.jpg"], ["truper", "/img/truper.jpg"]];

        if (count($_SESSION) <= count($products)){
            return $returnString.'<a href="/index.php">Перейти до покупок</a></tbody></table></div></main>';
        }

        for ($i = 0; $i < 3; $i++){

            $i_check = $i."_check";
            $i_num = $i."_num";

            if (isset($_SESSION[$i_check]) && $_SESSION[$i_check] == "on"){

                $num = 0;
                if (isset($_SESSION[$i_num])) {
                    $num  = $_SESSION[$i_num];
                }

                $returnString .='<tr>
                                    <th scope="row">'.($i+1).'</th>
                                    <td>
                                        <img src="'.$products[$i][1].'" alt="'.$products[$i][0].' picture" class="img-thumbnail img-small">
                                    </td>
                                    <td>
                                    '.$products[$i][0].'
                                    </td>
                                    <td>
                                        '.$num.'
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger" name="'.$i.'-button" onclick="Delete('.$i.')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>';
            }
        }
        return $returnString.'</tbody></table></div></main>';
    }
}