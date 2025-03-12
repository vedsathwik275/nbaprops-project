import requests
import json

def test_search(query):
    url = f"http://localhost:5001/api/players/search?q={query}"
    print(f"Testing search for: {query}")
    print(f"URL: {url}")
    
    try:
        response = requests.get(url)
        print(f"Status code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response data: {json.dumps(data, indent=2)}")
            print(f"Number of results: {len(data)}")
        else:
            print(f"Error response: {response.text}")
    except Exception as e:
        print(f"Exception occurred: {e}")

if __name__ == "__main__":
    queries = ["Trae", "LeBron", "Curry", "NonExistentPlayer"]
    
    for query in queries:
        test_search(query)
        print("-" * 50) 