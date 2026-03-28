# 📚 Smart Study Buddy

A full-stack web application that helps students plan their study schedule and track their progress efficiently.

## 🚀 Features

- User authentication (Register & Login with JWT)
- Create study goals
- Automatic task generation based on exam date
- Task management (todo / in-progress / done)
- Progress tracking (%)
- Protected routes
- Full frontend + backend integration

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Node.js
- Express
- PostgreSQL

### Authentication
- JWT (JSON Web Token)
- bcrypt (password hashing)

---



---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Abdelrahmanbaraka/smart-study-buddy
.git cd smart-study-buddy


2. Backend Setup
cd backend
npm install
npm run dev


3. Frontend Setup
cd frontend
npm install
npm run dev
🔐 Environment Variables

Create .env file in backend:

PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=yourpassword
DB_PORT=5432
JWT_SECRET=your_secret



🧠 How It Works
User creates a study goal
System calculates available days
Automatically generates daily tasks
User marks tasks as completed
Progress is calculated dynamically


📈 Future Improvements
UI/UX enhancements
Calendar view
Notifications
AI-based study recommendations


---

👨‍💻 Author
Abdelrahman Baraka


