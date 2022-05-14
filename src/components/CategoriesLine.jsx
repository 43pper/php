import React from 'react';
import "../styles/style.css";

const CategoriesLine = () => {
    return (
        <div className="container d-flex justify-content-center py-3">
            <input type="radio" className="btn-check" id="option1" name="gender" defaultChecked/>
                <label className="btn btn-outline-dark btn-activated mx-2" htmlFor="option1">Популярне</label>
            <input type="radio" className="btn-check" id="option2" name="gender"/>
                <label className="btn btn-outline-dark btn-activated mx-2" htmlFor="option2">Новинки</label>
            <input type="radio" className="btn-check" id="option3" name="gender"/>
                <label className="btn btn-outline-dark btn-activated mx-2" htmlFor="option3">Розпродаж</label>
        </div>
    );
};

export default CategoriesLine;