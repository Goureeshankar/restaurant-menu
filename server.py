from flask import Flask, request, jsonify
from twilio.rest import Client
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# 🔥 Firebase Initialization
cred = credentials.Certificate("serviceAccountKey.json")  # 🔴 इसे सही से सेट करो
firebase_admin.initialize_app(cred)
db = firestore.client()

# 📱 Twilio Credentials
import os
from dotenv import load_dotenv

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_NUMBER = "whatsapp:+919575693559"
TWILIO_SMS_NUMBER = "+919575693559"

# 🔥 Flask Server
app = Flask(__name__)
client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

# ✅ Order Notification Function
def send_notifications(order_details, customer_phone):
    # Format the message body
    items_list = ", ".join([f"{item['item']} (x{item['quantity']})" for item in order_details['items']])
    message_body = f"🛒 नया ऑर्डर मिला!\n🍕 Items: {items_list}\n💰 Total: ₹{order_details['total']}"

    # 📲 WhatsApp भेजना
    try:
        client.messages.create(
            body=message_body,
            from_=TWILIO_WHATSAPP_NUMBER,
            to=f"whatsapp:{customer_phone}"
        )
    except Exception as e:
        print(f"Error sending WhatsApp message: {e}")

    # 📩 SMS भेजना
    try:
        client.messages.create(
            body=message_body,
            from_=TWILIO_SMS_NUMBER,
            to=customer_phone
        )
    except Exception as e:
        print(f"Error sending SMS: {e}")

    print("✅ WhatsApp & SMS Sent!")

# 🛒 API Endpoint (Order Receive)
@app.route("/order", methods=["POST"])
def receive_order():
    data = request.get_json()
    order_details = data.get("order")
    customer_phone = data.get("phone")

    # Validate input data
    if not order_details or not customer_phone:
        return jsonify({"error": "Order details or phone number missing!"}), 400

    # Send notifications
    send_notifications(order_details, customer_phone)

    # 🔥 Order Firebase में Save करना
    try:
        db.collection("orders").add(order_details)
    except Exception as e:
        return jsonify({"error": f"Failed to save order to Firebase: {e}"}), 500
    
    return jsonify({"success": "Order received and notifications sent!"})

# 🚀 Server Run
if __name__ == "__main__":
    app.run(debug=True)