Here's your finalized and improved `README.md`, with a cleaner layout, better formatting, proper image section titles, and clearer section separations.

---

```markdown
# 📌 Pinterest Clone

A **fully responsive**, **full-stack Pinterest-style** web application where users can upload, view, and save pins, manage accounts, and explore visually appealing content.

Built using modern technologies like **React + Vite + Tailwind CSS** on the frontend, and **Node.js + Express + MongoDB** on the backend.

---

## 🌐 Live Demo

🔗 **[View the Live Site](https://pinterest-c.netlify.app/)**

---

## 🛠️ Tech Stack

### 🧩 Frontend
- ⚛️ React 19 (with Vite)
- 🎨 Tailwind CSS
- 🔥 React Hot Toast
- 📦 Axios
- 🧭 React Router v7
- 🧠 React Helmet (SEO Optimization)

### 🛠 Backend
- 🌐 Express.js
- 🗄 MongoDB with Mongoose
- 🔐 CORS, dotenv
- 📫 RESTful APIs

---

## 🚀 Key Features

- 🔐 User Authentication (Login/Signup)
- 🖼 Upload and Save Pins
- ❤️ Like Pins
- 🔎 Search Pins by Title
- 👤 User Profile Pages
- 🔐 Protected Routes
- 📱 Fully Responsive Layout
- 🧠 SEO Friendly
- 🔔 Toast Notifications

---

## 🖼️ UI Preview

### 🏠 Homepage
![Homepage](./screenshots/homepage.png)

### 🔐 Login Page
![Login](./screenshots/Login.png)

### 📝 Signup Page
![Signup](./screenshots/Signup.png)

### 👤 User Profile Page
![User Page](./screenshots/UserPage.png)

### 📤 Pin Upload Page
![Pin Upload](./screenshots/Pinupload.png)

### 📌 Pin Details Page
![Pin Details](./screenshots/PinPage.png)

---

## 📁 Folder Structure

```

pinterest-clone/
├── frontend/          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/           # Node/Express Backend
│   ├── api/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── models/
│   ├── .env
│   ├── index.js
│   └── package.json

````

---

## 🧪 Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/pinterest-clone.git
cd pinterest-clone
````

### 2️⃣ Setup the Backend

```bash
cd backend
npm install
touch .env
# Add your environment variables in .env file

npm start
```

### 3️⃣ Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file inside the `/backend` directory with the following:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🚢 Deployment

### 🧭 Frontend

* Deployed using [Vercel](https://vercel.com/)

### ⚙ Backend

* Deployed using [Railway](https://railway.app/) or [Render](https://render.com/)

---

## 📷 Summary Screenshots

| 🏠 Home Page                        | 📌 Pin Details                    | 📤 Upload Pin                          |
| ----------------------------------- | --------------------------------- | -------------------------------------- |
| ![Home](./screenshots/homepage.png) | ![Pin](./screenshots/PinPage.png) | ![Upload](./screenshots/Pinupload.png) |

> All images are placed in the `/screenshots` folder in the root directory.

---

## 🙋‍♂️ Author

**Waseem**
🔗 [GitHub Profile](https://github.com/Waseem3703)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project helpful or inspiring, please give it a ⭐ on GitHub and share it with others!

---

```
