<?php

class DBManager
{

    public static $db = null;

    public static $manager = null;

    function __construct()
    {
        $this->connectDB();
    }

    public static function getInstance() {
        if (!isset(self::$manager)) {
            self::$manager = new static();
        }
        self::connectDB();
        return self::$manager;
    }

    private static function connectDB()
    {
        if (!isset(self::$db)) {
            try {

                $line = 'sqlite:' . dirname(__DIR__) . '\db\sqlite\shopdb.db';
                self::$db = new PDO($line);
                self::$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $ex) {
                echo $ex->getMessage();
                throw new SQLiteException();
            }
        }
    }

    //USERS
    private static $GET_ALL_USERS = "SELECT * FROM Users";
    private static $GET_USER_BY_LOGIN = "SELECT * FROM Users WHERE User_login=:user_login";
    private static $GET_USER_BY_PURCHASE = "SELECT * FROM Users AS U INNER JOIN Purchases AS P WHERE P.Id=:purchase_id";
    private static $UPDATE_LOGIN = "UPDATE Users SET User_login=:new_login WHERE User_login=:login";
    private static $UPDATE_PASSWORD = "UPDATE Users SET User_password=:new_password WHERE User_login=:login";
    private static $UPDATE_PERSONAL_INFORMATION = "UPDATE Users SET FirstName=:first_name, LastName=:last_name, Phone=:phone, Email=:email WHERE User_login=:login";


    //CATEGORIES
    private static $GET_ALL_CATEGORIES = "SELECT * FROM Categories";

    //PRODUCTS
    private static $GET_ALL_PRODUCTS = "SELECT * FROM Products";
    private static $GET_PRODUCTS_COUNT_BY_ID = "SELECT Id, CountInStock FROM Products WHERE Id=:product_id";
    private static $GET_PRODUCTS_BY_CATEGORY = "SELECT * FROM Products WHERE Products.Category=:category";
    private static $GET_PRODUCTS_BY_PURCHASE = "SELECT * FROM Products JOIN Cart ON Products.Id = Cart.Product_id WHERE Cart.Purchase_id=:purchase_id";
    private static $GET_PRODUCTS_BY_NEWNESS = "SELECT * FROM Products ORDER BY Id DESC";
    private static $UPDATE_PRODUCTS_COUNT = "UPDATE Products SET CountInStock=CountInStock+:count WHERE Id=:product_id RETURNING CountInStock";


    //PURCHASES
    private static $GET_ALL_PURCHASES = "SELECT * FROM Purchases";
    private static $GET_PURCHASES_BY_ID = "SELECT * FROM Purchases WHERE Id=:purchase_id";
    private static $GET_PURCHASES_BY_LOGIN = "SELECT * FROM Purchases WHERE Purchases.User_login=:login ORDER BY Purchase_date DESC";
    private static $INSERT_INTO_PURCHASES = "INSERT INTO Purchases (User_login, Purchase_status, Purchase_date, FirstName, MiddleName, LastName, Phone, Email, np_SettlementRef, np_WarehouseRef, SettlementName, WarehouseName)
                                                             VALUES(:login, :status, :date, :firstname, :middlename, :lastname, :phone, :email, :city_ref, :warehouse_ref, :city_name, :warehouse_name) RETURNING Id";
    private static $DELETE_FROM_PURCHASES = "DELETE FROM Purchases WHERE Id=:purchase_id";

    //CART
    private static $GET_ALL_CARTS = "SELECT * FROM Cart";
    private static $GET_CARTS_BY_PURCHASE = "SELECT * FROM Cart WHERE Purchase_id=:purchase_id";
    private static $INSERT_INTO_CARTS = "INSERT INTO Cart (Purchase_id, Product_id, Quantity) VALUES(:purchase_id, :product_id, :quantity)";
    private static $DELETE_FROM_CARTS = "DELETE FROM Cart WHERE Purchase_id=:purchase_id";


    function getAllUsers()
    {
        try {
            $usersSet = static::$db->query(self::$GET_ALL_USERS);
            return $usersSet;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getUserByLogin($login)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_USER_BY_LOGIN);
            $stmt->execute([':user_login' => $login]);
            $users = $stmt->fetchAll();
            return $users;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function updateLogin($login, $new_login)
    {
        try {
            $stmt = static::$db->prepare(self::$UPDATE_LOGIN);
            $stmt->execute([':new_login' => $new_login, ':login' => $login]);
            return "ok";
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function updatePersonalInformation($login, $first_name, $last_name, $phone, $email)
    {
        try {
            $stmt = static::$db->prepare(self::$UPDATE_PERSONAL_INFORMATION);
            $stmt->execute([':first_name' => $first_name, ':last_name' => $last_name, ':phone' => $phone, ':email' => $email, ':login' => $login]);
            return "ok";
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function updatePassword($login, $new_password)
    {
        try {
            $stmt = static::$db->prepare(self::$UPDATE_PASSWORD);
            $stmt->execute([':new_password' => $new_password, ':login' => $login]);
            return "ok";
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getUserByPurchase()
    {
        try {
            $user = static::$db->query(self::$GET_USER_BY_PURCHASE);
            return $user;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getAllCategories()
    {
        try {
            $categories = static::$db->query(self::$GET_ALL_CATEGORIES);
            return $categories;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getAllProducts()
    {
        try {
            $products = static::$db->query(static::$GET_ALL_PRODUCTS);
            return $products;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsCount($products)
    {
        try {
            $products_with_count = [];
            for($i = 0; $i < count($products); $i++){
                $stmt = static::$db->prepare(self::$GET_PRODUCTS_COUNT_BY_ID);
                $stmt->execute([':product_id' => $products[$i]]);
                $products_with_count[] = $stmt->fetchAll()[0];
            }
            return $products_with_count;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsByNewness()
    {
        try {
            $products = static::$db->query(self::$GET_PRODUCTS_BY_NEWNESS);
            return $products;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsByCategory($category)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_PRODUCTS_BY_CATEGORY);
            $stmt->execute([':category' => $category]);
            $products = $stmt->fetchAll();
            return $products;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsByPurchase($purchase_id)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_PRODUCTS_BY_PURCHASE);
            $stmt->execute([':purchase_id' => $purchase_id]);
            $products = $stmt->fetchAll();
            return $products;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getAllPurchases()
    {
        try {
            $purchases = static::$db->query(self::$GET_ALL_PURCHASES);
            return $purchases;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getPurchaseByLogin($login)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_PURCHASES_BY_LOGIN);
            $stmt->execute([':login' => $login]);
            $purchases = $stmt->fetchAll();
            return $purchases;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function createPurchase($login, $status, $date, $firstname, $middlename, $lastname, $phone, $email, $city_ref, $warehouse_ref, $city_name, $warehouse_name, $products): string
    {
        try {
            static::$db->beginTransaction();

            $stmt = static::$db->prepare(self::$INSERT_INTO_PURCHASES);
            $stmt->execute([':login' => $login,
                ':status' => $status,
                ':date' => $date,
                ':firstname' => $firstname,
                ':middlename' => $middlename,
                ':lastname' => $lastname,
                ':phone' => $phone,
                ':email' => $email,
                ':city_ref' => $city_ref,
                ':warehouse_ref' => $warehouse_ref,
                ':city_name' => $city_name,
                ':warehouse_name' => $warehouse_name]);
            $purchaseId = $stmt->fetchAll()[0]["Id"];

            for ($i = 0; $i < count($products); $i++) {
                $stmt = static::$db->prepare(self::$UPDATE_PRODUCTS_COUNT);
                $stmt->execute([':product_id' => $products[$i]["db_id"],
                    ':count' => -$products[$i]["count"]]);
                if ($stmt->fetchAll()[0]["CountInStock"] < 0) {
                    static::$db->rollBack();
                    return 'not_enough_in_stock';
                }

                $stmt = static::$db->prepare(self::$INSERT_INTO_CARTS);
                $stmt->execute([':purchase_id' => $purchaseId,
                    ':product_id' => $products[$i]["db_id"],
                    ':quantity' => $products[$i]["count"]]);
            }
            static::$db->commit();
            return 'success';
        } catch (PDOException $ex) {
            static::$db->rollBack();
            return $ex->getMessage();
        }
    }

    function deletePurchase($login, $purchase_id): string
    {
        try {
            static::$db->beginTransaction();

            $stmt = static::$db->prepare(self::$GET_PURCHASES_BY_ID);
            $stmt->execute([':purchase_id' => $purchase_id]);
            $purchase = $stmt->fetchAll();
            if ($purchase[0]["User_login"] != $login) {
                static::$db->rollBack();
                return 'unauthorized';
            }
            if ($purchase[0]["Purchase_status"] != "PROCESSED") {
                static::$db->rollBack();
                return 'wrong_status';
            }

            $stmt = static::$db->prepare(self::$GET_CARTS_BY_PURCHASE);
            $stmt->execute([':purchase_id' => $purchase_id]);
            $carts = $stmt->fetchAll();

            for ($i = 0; $i < count($carts); $i++) {
                $stmt = static::$db->prepare(self::$UPDATE_PRODUCTS_COUNT);
                $stmt->execute([':product_id' => $carts[$i]["Product_id"],
                    ':count' => $carts[$i]["Quantity"]]);
            }

            $stmt = static::$db->prepare(self::$DELETE_FROM_CARTS);
            $stmt->execute([':purchase_id' => $purchase_id]);

            $stmt = static::$db->prepare(self::$DELETE_FROM_PURCHASES);
            $stmt->execute([':purchase_id' => $purchase_id]);

            static::$db->commit();
            return 'success';
        } catch (PDOException $ex) {
            static::$db->rollBack();
            return $ex->getMessage();
        }
    }

    function getAllCarts()
    {
        try {
            $carts = static::$db->query(self::$GET_ALL_CARTS);
            return $carts;
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }


}

?>