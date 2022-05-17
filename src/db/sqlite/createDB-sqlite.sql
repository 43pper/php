
CREATE TABLE Categories
(
	Title TEXT(30) NOT NULL PRIMARY KEY
);

CREATE TABLE Products
(
	Id INTEGER PRIMARY KEY autoincrement,
    Title TEXT NOT NULL,
    Price REAL NOT NULL,
    Weight REAL NULL,
    Category TEXT NULL,
    FOREIGN KEY (Category) REFERENCES Categories (Title) ON DELETE SET NULL
);

CREATE TABLE Users
(
	User_login TEXT NOT NULL PRIMARY KEY,
	User_password TEXT NOT NULL,
	FirstName TEXT NULL,
    LastName TEXT NULL,
    Email TEXT NOT NULL UNIQUE,
    Phone TEXT NULL UNIQUE
);

CREATE TABLE Moderators
(
	Moderator_login TEXT NOT NULL PRIMARY KEY,
	Moderator_password TEXT NOT NULL,
	FirstName TEXT NULL,
    LastName TEXT NULL,
    Email TEXT NOT NULL UNIQUE,
    Phone TEXT NULL UNIQUE
);

CREATE TABLE Purchases
(
	Id INTEGER PRIMARY KEY autoincrement,
    User_login TEXT NOT NULL,
    Purchase_status TEXT NOT NULL DEFAULT "COLLECT",
    Purchase_date DATETIME NULL,
    FOREIGN KEY (User_login) REFERENCES Users (User_login) ON DELETE CASCADE
);

CREATE TABLE Cart
(
	Purchase_id INTEGER NOT NULL,
    Product_id INTEGER NOT NULL,
	FOREIGN KEY (Purchase_id) REFERENCES Purchases (Id) ON DELETE CASCADE,
    FOREIGN KEY (Product_id) REFERENCES Products (Id) ON DELETE CASCADE,
    PRIMARY KEY(Purchase_id, Product_id)
);

