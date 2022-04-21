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
            $productsBlocks .= '<tr>
                                    <th scope="row">'.($i+1).'</th>
                                    <td>
                                        <input type="checkbox" class="form-check-input" name="'.$i.'_check">
                                    </td>
                                    <td>
                                        <img src="'.$products[$i][1].'" alt="'.$products[$i][0].' picture" class="img-thumbnail img-small">
                                    </td>
                                    <td>
                                    '.$products[$i][0].'
                                    </td>
                                    <td>
                                        <input type="number" class="form-control" name="'.$i.'_num" min="0" max="100" value="0">
                                    </td>
                                </tr>';
        }

        return '<main class="bg-light">
                    <div class="container bg-white body_content">
                        <h1 class="display-4">Головна</h1>
                        <form action="/buy.php" method="POST">
                        <table class="table table-bordered align-middle text-center">
                            <thead>
                                <tr>
                                    <th scope="col" class="col-1">№</th>
                                    <th scope="col" class="col-2"></th>
                                    <th scope="col" class="col-2"></th>
                                    <th scope="col" class="col-5">Назва</th>
                                    <th scope="col" class="col-1">Кількість</th>
                                </tr>
                            </thead>
                            <tbody>
                            '.$productsBlocks.'
                            </tbody>
                       </table>
                       <div class="text-end py-3"><input type="submit" class="btn btn-primary" value="Купити"></div>
                       </form>
                   </div>
                </main>';
    }
}
