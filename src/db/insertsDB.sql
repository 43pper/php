USE shopdb;

INSERT INTO users
(User_login, User_password, FirstName, LastName, Email)
VALUES ("cipochka25", "0000", "Василь", "Петренко", "vasyliypetrenko@gmail.com");

INSERT INTO users
(User_login, User_password, FirstName, LastName, Email, Phone)
VALUES ("minicat250", "qwerty0101", "Світлана", "Василівна", "svitlanamakeup@gmail.com", "380990751233");

INSERT INTO users
(User_login, User_password, Email)
VALUES ("stanisuck", "ohmypass2003", "stanisuckmail@gmail.com");

INSERT INTO moderators
(Moderator_login, Moderator_password, FirstName, LastName, Email, Phone)
VALUES ("yarikbimba", "qwerty0121", "Ярослав", "Масенко", "yaroslav.masenko@nure.ua", "380958805535");

INSERT INTO moderators
(Moderator_login, Moderator_password, FirstName, LastName, Email, Phone)
VALUES ("soslav", "qwerty2101", "Станіслав", "Мацак", "stanislav.matsak@nure.ua", "380990731653");

INSERT INTO categories
(Title)
VALUES ("Butterfly");

INSERT INTO categories
(Title)
VALUES ("Hunter");

INSERT INTO categories
(Title)
VALUES ("M9-Bayonet");

INSERT INTO products
(Title, Price, Weight, Category)
VALUES ("Doppler",  570, 430.5, "M9-Bayonet");

INSERT INTO products
(Title, Price, Weight, Category)
VALUES ("Tundra Hunter",  380, 290, "Hunter");

INSERT INTO products
(Title, Price, Category)
VALUES ("Galaxy Eye",  450, "Butterfly");

INSERT INTO purchases
(User_login, Purchase_status, Purchase_date)
VALUES ("stanisuck",  "CANCELLED", "2022-05-16");

INSERT INTO cart
(Purchase_id, Product_id)
VALUES (1,  1);

INSERT INTO cart
(Purchase_id, Product_id)
VALUES (1,  2);

INSERT INTO purchases
(User_login, Purchase_status)
VALUES ("stanisuck",  default);

INSERT INTO cart
(Purchase_id, Product_id)
VALUES (2,  1);

INSERT INTO cart
(Purchase_id, Product_id)
VALUES (2,  2);

UPDATE purchases
SET Purchase_date="2022-05-17", Purchase_status="DONE"
WHERE Id=2;






