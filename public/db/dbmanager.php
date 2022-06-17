<?php

class DBManager
{

    public static PDO $db;

    public static DBManager $manager;

    function __construct()
    {
        $this->connectDB();
    }

    public static function getInstance(): static
    {
        if (!isset(self::$manager)) {
            self::$manager = new static();
        }
        self::connectDB();
        self::$db->query("PRAGMA foreign_keys = ON");
        return self::$manager;
    }

    private static function connectDB(): void
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
    private static $INSERT_INTO_PRODUCTS = "INSERT INTO Products (Title, Price, Weight, Category, Image, CountInStock)
                                                             VALUES(:title, :price, :weight, :category, :image, :in_stock) RETURNING Id";
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

    //STATISTICS
    private static $INSERT_INTO_IP_LIST = "INSERT INTO statistics_ip_list (Ip, Date) VALUES (:ip, :date)";
    private static $DELETE_FROM_IP_LIST_BY_DATE = "DELETE FROM statistics_ip_list WHERE Date!=:date";
    private static $RESET_STATISTICS = "UPDATE statistics SET hosts=0, hits=0, date=:date WHERE date!=:date";
    private static $INCREASE_STATISTICS = "UPDATE statistics SET hosts=hosts+:hosts_inc, hits=hits+:hits_inc, total=total+:total_inc";
    private static $GET_STATISTICS_RECORDS_BY_IP = "SELECT * FROM statistics_ip_list WHERE Ip=:ip";
    private static $GET_STATISTICS = "SELECT * FROM statistics";

    function getAllUsers()
    {
        try {
            return static::$db->query(self::$GET_ALL_USERS);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getUserByLogin($login)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_USER_BY_LOGIN);
            $stmt->execute([':user_login' => $login]);
            return $stmt->fetchAll();
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
            return static::$db->query(self::$GET_USER_BY_PURCHASE);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getAllCategories()
    {
        try {
            return static::$db->query(self::$GET_ALL_CATEGORIES);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getAllProducts()
    {
        try {
            return static::$db->query(static::$GET_ALL_PRODUCTS);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsCount($products)
    {
        try {
            $products_with_count = [];
            for ($i = 0; $i < count($products); $i++) {
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
            return static::$db->query(self::$GET_PRODUCTS_BY_NEWNESS);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsByCategory($category)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_PRODUCTS_BY_CATEGORY);
            $stmt->execute([':category' => $category]);
            return $stmt->fetchAll();
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getProductsByPurchase($purchase_id)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_PRODUCTS_BY_PURCHASE);
            $stmt->execute([':purchase_id' => $purchase_id]);
            return $stmt->fetchAll();
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function createProduct($title, $price, $weight, $category, $image, $in_stock): string
    {
        try {
            $stmt = static::$db->prepare(self::$INSERT_INTO_PRODUCTS);
            $stmt->execute([':title' => $title, ':price' => $price, ':weight' => $weight, ':category' => $category, ':image' => $image, ':in_stock' => $in_stock]);

            $id = $stmt->fetchAll()[0]["Id"];

            $stmt = static::$db->prepare(self::$GET_PRODUCTS_COUNT_BY_ID);
            $stmt->execute([':product_id' => $id]);
            if (count($stmt->fetchAll()) == 0) {
                return "error";
            }

            return "success";
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }

    function getAllPurchases()
    {
        try {
            return static::$db->query(self::$GET_ALL_PURCHASES);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function getPurchaseByLogin($login)
    {
        try {
            $stmt = static::$db->prepare(self::$GET_PURCHASES_BY_LOGIN);
            $stmt->execute([':login' => $login]);
            return $stmt->fetchAll();
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
            return static::$db->query(self::$GET_ALL_CARTS);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    function resetStatistics(): string
    {
        try {
            $date = date('Y-m-d');
            $stmt = static::$db->prepare(self::$DELETE_FROM_IP_LIST_BY_DATE);
            $stmt->execute([':date' => $date]);
            $stmt = static::$db->prepare(self::$RESET_STATISTICS);
            $stmt->execute([':date' => $date]);
            return "success";
        } catch (PDOException $ex) {
            return $ex->getMessage();
        }
    }

    function UpdateStatistics($ip)
    {
        try {
            static::$db->beginTransaction();

            $date = date('Y-m-d');
            $stmt = static::$db->prepare(self::$GET_STATISTICS_RECORDS_BY_IP);
            $stmt->execute([':ip' => $ip]);
            if (count($stmt->fetchAll()) > 0) {
                $stmt = static::$db->prepare(self::$INCREASE_STATISTICS);
                $stmt->execute([':hosts_inc' => 0, ':hits_inc' => 1, 'total_inc' => 1]);
            } else {
                $stmt = static::$db->prepare(self::$INSERT_INTO_IP_LIST);
                $stmt->execute([':ip' => $ip, ':date' => $date]);
                $stmt = static::$db->prepare(self::$INCREASE_STATISTICS);
                $stmt->execute([':hosts_inc' => 1, ':hits_inc' => 1, 'total_inc' => 1]);
            }

            $stmt = static::$db->query(self::$GET_STATISTICS);
            static::$db->commit();

            return $stmt->fetchAll()[0];
        } catch (PDOException $ex) {
            static::$db->rollBack();
            return $ex->getMessage();
        }
    }


}