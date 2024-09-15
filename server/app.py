from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set up Gemini API key (Use environment variable for security)
genai.configure(api_key="AIzaSyAMttgd1TbM-6Ourlu-rKjZClcncbpG0NA")

# Initialize the Generative Model
model = genai.GenerativeModel("gemini-1.5-flash")

# Sample data for fruits
fruits = {
    "apple": {"name": "Apple", "description": "A sweet, crunchy fruit.", "image": "images/apple.jpg"},
    "banana": {"name": "Banana", "description": "A soft, yellow fruit.", "image": "images/banana.jpg"},
    # Add more fruits as needed
}

# Global variable to store selected fruit
selected_fruit = None

@app.route('/fruits', methods=['GET'])
def get_fruits():
    return jsonify(fruits)

@app.route('/fruit/<fruit_name>', methods=['GET'])
def get_fruit(fruit_name):
    global selected_fruit
    fruit = fruits.get(fruit_name)

    if fruit:
        selected_fruit = fruit
        print(f"Selected fruit: {selected_fruit}")
        return jsonify(fruit)
    return jsonify({"error": "Fruit not found"}), 404

@app.route('/chat', methods=['POST'])
def gemini_chat():
    data = request.json
    message = data.get('message')
    selected_fruit_name = data.get('selectedFruit')
    history = data.get('history', [])  # Fetch history if available

    # If there is a message and either a selected fruit or history
    if message:
        # Check if a fruit is selected in the request
        if selected_fruit_name:
            selected_fruit = fruits.get(selected_fruit_name.lower())  # Get the fruit
            if selected_fruit:
                # If a new fruit is selected, prepend its info to the conversation history
                fruit_info = f"You selected {selected_fruit['name']}: {selected_fruit['description']}."
                history.append({"role": "system", "content": fruit_info})

        # Add the user's latest question to the history
        history.append({"role": "user", "content": message})

        try:
            # Build the conversation context by joining the historical messages
            conversation_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])

            # Generate response from the model
            response = model.generate_content(conversation_history)
            
            # Append the model's response to the history
            history.append({"role": "assistant", "content": response.text})

            return jsonify({"response": response.text, "updated_history": history})
        except Exception as e:
            print(f"Error in /chat route: {e}")
            return jsonify({"error": "Something went wrong!"}), 500

    return jsonify({"error": "No message received"}), 400


if __name__ == '__main__':
    app.run(debug=True)