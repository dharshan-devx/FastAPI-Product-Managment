import requests
import json

# Test the API endpoints
base_url = "http://127.0.0.1:8000"

print("Testing FastAPI Product API")
print("=" * 40)

# Test 1: Get all products
print("\n1. Getting all products...")
try:
    response = requests.get(f"{base_url}/products/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        products = response.json()
        print(f"Found {len(products)} products")
        for product in products:
            print(f"  - {product['name']}: ${product['price']}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Error: {e}")

# Test 2: Get a specific product
print("\n2. Getting product with ID 1...")
try:
    response = requests.get(f"{base_url}/products/1")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        product = response.json()
        print(f"Product: {product['name']} - {product['description']}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Error: {e}")

# Test 3: Create a new product
print("\n3. Creating a new product...")
new_product = {
    "id": 12,
    "name": "Desk Lamp",
    "description": "A bright LED desk lamp",
    "price": 29.99,
    "quantity": 25
}
try:
    response = requests.post(f"{base_url}/products/", json=new_product)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Success: {result['message']}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 40)
print("API tests completed!")
