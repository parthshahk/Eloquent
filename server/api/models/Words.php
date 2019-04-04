<?php

    include_once '../config/wordsAPI.php';

    class Words {

        // DB stuff
        private $conn;

        // Connection with DB
        public function  __construct($db){
            $this -> conn = $db;
        }

        public function getMeaning(){

            $word = $_GET['word'];
            echo callWordsAPI($word);
        }

        public function getThesaurus(){

            $word = $_GET['word'];
            echo callThesaurusAPI($word);
        }
    }
?>