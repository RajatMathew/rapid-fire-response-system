import requests

url = "http://localhost:8000/recv"

with open("image.jpg", "rb") as image:
    files = {"file": image}
    response = requests.post(url, files=files)

print(response.status_code)
print(response.json())