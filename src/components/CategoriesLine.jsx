import React from 'react';
import "../styles/style.css";

const CategoriesLine = () => {
    return (
        <div className="categoriesLine">
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-dark categoriesLine__item btn-activated">Популярне</button>
                <button type="button" className="btn btn-dark categoriesLine__item btn-activated">Новинки</button>
                <button type="button" className="btn btn-dark categoriesLine__item btn-activated">Розпродаж</button>
            </div>
        </div>
    );
};

export default CategoriesLine;