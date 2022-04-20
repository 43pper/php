<?php
class HomePage extends Page{
    function __construct(){
        parent::__construct("Головна");
    }

    function getMain() : string{
        return '<main>
                    <div>ВІТАЄМО НА ГОЛОВНІЙ<br>
                    <a href="/basket.php">перейти в кошик</a>
                    </div>
                    <form action="/buy.php" method="POST">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <input type="checkbox" class="form-check-input" name="1_check">
                                </div>
                                <div class="col-3">
                                    <img src="/img/firebird.jpg" alt="Firebird picture">
                                </div>
                                <div class="col-5">
                                    firebird
                                </div>
                                <div class="col-3">
                                    <input type="number" class="form-control" name="1_num" min="0" max="100" value="0">
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <input type="checkbox" class="form-check-input" name="2_check">
                                </div>
                                <div class="col-3">
                                    <img src="/img/ganzo.jpg" alt="Ganzo picture">
                                </div>
                                <div class="col-5">
                                    ganzo
                                </div>
                                <div class="col-3">
                                    <input type="number" class="form-control" name="2_num" min="0" max="100" value="0">
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <input type="checkbox" class="form-check-input" name="3_check">
                                </div>
                                <div class="col-3">
                                    <img src="/img/truper.jpg" alt="Truper picture">
                                </div>
                                <div class="col-5">
                                    truper
                                </div>
                                <div class="col-3">
                                    <input type="number" class="form-control" name="3_num" min="0" max="100" value="0">
                                </div>
                            </div>
                            <input type="submit" value="Купити">
                        </div>
                    </form>
                </main>';
    }
}
