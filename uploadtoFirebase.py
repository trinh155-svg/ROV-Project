import pandas as pd
import requests

# Đọc CSV trong folder
csv_path = "rov_data.csv"
data = pd.read_csv(csv_path)

print(data.head())

# Firebase
firebase_url = "https://esp-project-efee7-default-rtdb.firebaseio.com/real_data_test.json"

# Upload
res = requests.put(firebase_url, json=data.to_dict(orient="records"))
res.raise_for_status()

print("Upload xong")