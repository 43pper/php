import React from 'react';
import "../styles/style.css";
import Counter from "./Counter";

const Basket = () => {
    return (
        <div className="overlay overlay-hide"  id="overlay">
            <div className="half-visible" onClick={() => closeOverlay()}>

            </div>
            <div className="container-md modal-container bg-white">
                <div className="container pb-3">
                    <div className="row justify-content-between align-items-center py-1">
                        <div className="col align-items-end">
                            <span className="h2">Кошик</span>
                        </div>
                        <div className="col p-3 text-end">
                            <button type="button" className="btn-close btn-outline-light" aria-label="Close" onClick={() => closeOverlay()}></button>
                        </div>
                    </div>
                    <table className="table align-middle text-center">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col">Кількість</th>
                                <th scope="col">Вартість</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="basket-pic">
                                        <img src={require("../images/knife1.jpg")} alt="pic"/>
                                    </div>
                                </td>
                                <td>
                                    title
                                </td>
                                <td>
                                    <Counter count="2"/>
                                </td>
                                <td>
                                    price
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-end">
                        <span className="d-block pb-3">Всього: 999 грн</span>
                        <button className="btn btn-dark">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
function closeOverlay(){
    document.getElementById("overlay").classList.add("overlay-hide");
    document.getElementsByTagName("body")[0].classList.remove("noscroll");
}
export default Basket;