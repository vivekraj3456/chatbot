from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

GEMINI_API_KEY = "AIzaSyDqkf2dB30_hUHipKoGdFFZTzlDPpOMwjg"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

@app.route("/", methods=["GET", "POST"])
def home():
    response_text = None
    if request.method == "POST":
        user_input = request.form.get("query")
        payload = {
            "contents": [{
                "parts": [{"text": user_input}]
            }]
        }
        headers = {
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(GEMINI_URL, headers=headers, data=json.dumps(payload))
            data = response.json()
            response_text = data['candidates'][0]['content']['parts'][0]['text']
        except Exception as e:
            response_text = "Error connecting to the server."

    return render_template("index.html", response=response_text)
