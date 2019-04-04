<?php
    include_once 'credentials.php';
    class Database {
    
        // DB Params
        private $host;
        private $db_name;
        private $username;
        private $password;
        private $conn;

        // DB Connect
        public function connect() {

            $this -> host = getHost();
            $this -> username = getUsername();
            $this -> password = getPassword();
            $this -> db_name = getDatabase();

            $this->conn = null;

            try { 

                $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=utf8mb4', $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                
            } catch(PDOException $e) {
                echo 'Connection Error: ' . $e->getMessage();
            }

            return $this->conn;
        }
        
    }

?>