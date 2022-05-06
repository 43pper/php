import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="header__column header__column_ col-md-5">

            </div>
            <div className="header__column header__column_logo col-md-2">
                LOGO
            </div>
            <div className="header__column header__column_userBar col-md-5">
                <div className="userBar">
                    <div className="userBar__item col-md-2 account _icon-user">

                    </div>
                    <div className="userBar__item col-md-2 favourite _icon-like">

                    </div>
                    <div className="userBar__item col-md-2 cart _icon-cart">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;