### User Registration Web App

This is a simple user registration web application built with React for the frontend and Flask for the backend. Users can fill in their registration information, and the app will process this data, generate a PDF report, and send it to their email.

### Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): You need Node.js to run the frontend.
- [Python](https://www.python.org/): You need Python to run the backend.
- [R](https://www.r-project.org/): You need R for age calculation in the backend (if you haven't already installed it).

### Frontend

To run the frontend, follow these steps:

1. Navigate to the `frontend` directory in your terminal.

```bash
cd frontend
```

2. Install the required dependencies.

```bash
npm install
```

3. Start the development server.

```bash
npm start
```

The frontend should be running on `http://localhost:3000`.

### Backend

To run the backend, follow these steps:

1. Navigate to the `backend` directory in your terminal.

```bash
cd backend
```

2. Install the required Python packages.

```bash
pip install flask
pip install flask_cors
pip install reportlab
pip install rpy2==3.5.1
```

5. Start the Flask server.

```bash
flask run
```

The backend should be running on `http://localhost:5000`.

### Project Structure

- The `frontend` directory contains the React-based user interface.
- The `backend` directory contains the Flask-based server and R scripts.

## Email Configuration (email_info.py)

To configure email sending, create an `email_info.py` file in the `backend` directory. This file should include your email sender information and password. Example:

```python
# email_info.py

# Sender's email address and password
sender = "your_email@gmail.com"
password = "your_password"
```

Replace `"your_email@gmail.com"` and `"your_password"` with your actual email and password.