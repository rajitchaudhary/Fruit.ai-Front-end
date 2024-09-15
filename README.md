## Project Overview
Fruit.ai is a health manager application designed to provide users with features like chatbot interactions, fruit-related FAQs, language translation, and more. The product is optimized for both mobile and web platforms, offering a clean and intuitive user experience
### Logging credentials

To log into the application, use the following credentials:

- **Email:** demo@example.com
- **Password:** password123

### Register credentials

To Register into the application, use the following credentials:

-**Mobile number**: Any 10-digit number
-**OTP**: 1234
  

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   Navigate to the project directory and run:

   ```bash
   npm install
   ```

### Running the Project

1. **Start the Development Server**

   In the project directory, run:

   ```bash
   npm start
   ```

   This will start the React development server and open the application in your default web browser. The app will be available at `http://localhost:3000`.

### Project Structure

- **Login Page:** `/login`
- **Register Page:** `/register`
- **Home Page:** `/home`
- **Chatbot Page:** `/chatbot`
- **Translator Page:** `/translator`
- **FAQ Page:** `/faq`
- **About Page:** `/about`


### Backend Integration

The frontend interacts with a Flask backend that provides:

- **CRUD Operations on FAQ**
- **Google translator**
- **Chat bot Gemini API**

