<?php
class DBManager{

    public $db = null;

    function __construct()
    {
        $this->connectDB();
    }

    function connectDB(){
        if ($this->db == null){
            try {
                $this->db = new PDO('sqlite:../db/sqlite/shopdb.db');
                $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $ex) {
                echo $ex->getMessage();
            }
        }
    }

    //USERS
    private static $GET_ALL_USERS = "SELECT * FROM Users";
    private static $GET_USER_BY_LOGIN = "SELECT * FROM Users WHERE User_login=:user_login";
    private static $GET_USER_BY_PURCHASE = "SELECT * FROM Users AS U INNER JOIN Purchases AS P WHERE P.Id=:purchase_id";


    //MODERATORS
    private static $GET_ALL_MODERATORS = "SELECT * FROM Moderators";

    //CATEGORIES
    private static $GET_ALL_CATEGORIES = "SELECT * FROM Categories";

    //PRODUCTS
    private static $GET_ALL_PRODUCTS = "SELECT * FROM Products";
    private static $GET_PRODUCTS_BY_CATEGORY = "SELECT * FROM Products WHERE Products.Category=:category";
    private static $GET_PRODUCTS_BY_PURCHASE = "SELECT * FROM Products AS Prod INNER JOIN Purchases AS Purch WHERE Purch.Id=:purchase_id";
    private static $GET_PRODUCTS_BY_NEWNESS = "SELECT * FROM Products ORDER BY Id DESC";

    //PURCHASES
    private static $GET_ALL_PURCHASES = "SELECT * FROM Purchases";

    //CART
    private static $GET_ALL_CARTS = "SELECT * FROM Cart";


    function getAllUsers(){
        try{
            $usersSet = $this->db->query(self::$GET_ALL_USERS);
            return $usersSet;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }


    function getUserByLogin(){
        try{
            $user = $this->db->query(self::$GET_USER_BY_LOGIN);
            return $user;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getUserByPurchase(){
        try{
            $user = $this->db->query(self::$GET_USER_BY_PURCHASE);
            return $user;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getAllModerators(){
        try{
            $moderators = $this->db->query(self::$GET_ALL_MODERATORS);
            return $moderators;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getAllCategories(){
        try{
            $categories = $this->db->query(self::$GET_ALL_CATEGORIES);
            return $categories;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getAllProducts(){
        try{
            $products = $this->db->query(self::$GET_ALL_PRODUCTS);
            return $products;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getProductsByNewness(){
        try{
            $products = $this->db->query(self::$GET_PRODUCTS_BY_NEWNESS);
            return $products;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getProductsByCategory($category){
        try{
            $stmt = $this->db->prepare(self::$GET_PRODUCTS_BY_CATEGORY);
            $stmt->execute([':category' => $category]);
            $products = $stmt->fetchAll();
            return $products;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getProductsByPurchase($purchase_id){
        try{
            $stmt = $this->db->prepare(self::$GET_PRODUCTS_BY_PURCHASE);
            $stmt->execute([':purchase_id' => $purchase_id]);
            $products = $stmt->fetchAll();
            return $products;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getAllPurchases(){
        try{
            $purchases = $this->db->query(self::$GET_ALL_PURCHASES);
            return $purchases;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }

    function getAllCarts(){
        try{
            $carts = $this->db->query(self::$GET_ALL_CARTS);
            return $carts;
        }
        catch (PDOException $ex){
            echo $ex->getMessage();
        }
    }


}
 ?>