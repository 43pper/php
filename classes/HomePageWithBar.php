<?php
class HomePageWithBar extends Page{
    function __construct(){
        parent::__construct("Головна");
    }

    function getHeader() : string{
        return '<div class="header container-fluid sticky-top bg-dark">
                    <header class="container d-flex flex-wrap justify-content-center py-3">
                        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <span class="fs-4" style="color: white">KnivesPerfection</span>
                        </a>
                        <a href="/basket.php" class="nav-link">Кошик</a>
                    </header>
                </div>';
    }

    function getMain() : string{


        $products = [["firebird", "/img/firebird.jpg"], ["ganzo", "/img/ganzo.jpg"], ["truper", "/img/truper.jpg"]];

        $productsBlocks = "";
        for ($i = 0; $i < count($products); $i ++){
            $productsBlocks .= '<tr style="color: white">
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

        return '<main class="bg-dark">
                    <div class="container bg-gradient body_content">
                        <h1 class="display-4" style="text-align: center; text-shadow: -1px -1px 0 white, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 white;">Головна</h1>
                        <form action="/buy.php" method="POST">
                        <table class="table table-bordered align-middle text-center">
                            <thead>
                                <tr  style="color: white">
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
                   </div>'.$this->getBar().'
                </main>';
    }

    function getBar(){
        return '<aside>
                    <div style="position: fixed; background: #0d6efd; float: left; top: 50%; 
                    margin-left: 1%; padding: 10px; align-items: center; width: 230px; text-align: center; font-size: 16pt; border-radius: 15px">
                        <p style="border-style: double; border-color: white; border-radius: 0 50px 50px 0;">
                            <a class="text-light" href="../index.php">Головна</a>
                        </p>
                        <p class=".text-light" style="border-style: double; border-color: white; border-radius: 0 50px 50px 0;">
                            <a class="text-light" href="../buy.php">Кошик</a>
                        </p>
                    </div>
                </aside>';
    }
}
