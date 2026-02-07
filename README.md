# Hackathon-2-phase-2

A full-stack Todo Application featuring a robust backend and a modern, responsive frontend.

## 🚀 Features

- **Authentication**: Secure Login and Signup functionality.
- **Task Management**: Create, Read, Update, and Delete (CRUD) your tasks.
- **Responsive UI**: Optimized for different screen sizes with a premium dark-themed design.
- **State Management**: Real-time UI updates without page reloads.

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: FastAPI, SQLModel (Python)
- **Database**: SQLite

## 🏁 Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/FabihaHaider63/Hackthon-02-phase-2.git
cd Hackathon-2-phase-2
```

### 2. Backend Setup

```bash
cd backend
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd ../frontend
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📌 Usage

- Register for a new account or login with existing credentials.
- After logging in, you will be redirected to the Tasks page.
- Create new tasks with titles and descriptions.
- Use the 🗑️ icon to delete tasks instantly or ✏️ to edit them.
- Toggle completion status with the checkmark icon.

---
Built for the Hackathon Phase 2.
