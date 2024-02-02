package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gocolly/colly/v2"
	"github.com/gorilla/mux"

	_ "github.com/joho/godotenv/autoload"
)

type IncomingBodyRequest struct {
	Keywords  string `json:"keywords"`
	Frequency int    `json:"frequency"`
	Location  string `json:"location"`
}

type Response struct {
	Result    string    `json:"result"`
	Timestamp time.Time `json:"timestamp"`
}

func main() {
	port := os.Getenv("ROBOT_PORT")

	router := mux.NewRouter()
	router.HandleFunc("/scraping", scrapingHandler).Methods("POST")

	fmt.Printf("Server ready and listen ons localhost:%s", port)
	http.ListenAndServe(fmt.Sprintf(":%s", port), router)
}

func scrapingHandler(w http.ResponseWriter, req *http.Request) {
	var processedData []Response

	body := getRequestBody(w, req)
	if body == nil {
		return
	}

	c := colly.NewCollector()
	c.OnHTML("h3", func(h *colly.HTMLElement) {
		result := h.Text
		timestamp := time.Now()

		data := Response{
			Result:    result,
			Timestamp: timestamp,
		}

		if len(processedData) < body.Frequency {
			processedData = append(processedData, data)
		}
	})
	c.Visit(fmt.Sprintf("https://www.google.com/search?q=%s&lr=%s&num=%d", body.Keywords, body.Location, body.Frequency))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(processedData)
}

func getRequestBody(w http.ResponseWriter, req *http.Request) *IncomingBodyRequest {
	var body IncomingBodyRequest

	if err := json.NewDecoder(req.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return nil
	}

	return &body
}
