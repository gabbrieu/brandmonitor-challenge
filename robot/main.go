package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Something wrong happens when loading the env file: %s", err)
	}

	port := os.Getenv("ROBOT_PORT")

	router := mux.NewRouter()
	router.HandleFunc("/scraping", scrapingHandler).Methods("POST")

	fmt.Printf("Server ready and listen ons localhost:%s", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), router)
}

func scrapingHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"prop1": "teste",
	})
}
