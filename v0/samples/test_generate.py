import requests

url = "http://localhost:3000/video/generate"
headers = {"Content-Type": "application/json", "X-API-KEY": "testkey"}

with open("samples/request.json") as f:
    data = f.read()

response = requests.post(url, headers=headers, data=data)
print("Response:", response.status_code)
print(response.json())