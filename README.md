# 🎬 Movie Management Application (MERN Stack)

A full‑stack **Movie Management & Discovery Application** built using the **MERN stack** with role‑based access control. Users can browse movies with pagination, search, and sorting, while **Admins** can securely add, edit, delete movies including **poster upload support**.


## 🌐 Live Site

- **Frontend Site:** [Click Now](https://movie-management-system-one.vercel.app/)
- **Backend Site:** [Click Now](https://movie-management-system-us3q.onrender.com/)

---

## 🚀 Features

### 👤 Authentication & Authorization

* JWT‑based authentication
* Login & Register combined on a **single Auth page (tab switch)**
* Role‑based access:

  * **User** → View movies
  * **Admin** → Manage movies (CRUD)
* Protected admin routes

### 🎥 Movie Features

* Paginated movie listing (User & Admin)
* Search movies by title & description
* Sort movies by rating, duration, release date
* Responsive movie cards

  * Desktop → Fixed width (800–900px), centered
  * Mobile → Card layout
* Release date formatted as **DD/MM/YYYY**

### 🛠 Admin Features

* Add movie via modal form
* Edit movie (pre‑filled form)
* Delete movie with confirmation dialog
* Upload poster image (Cloudinary)
* Success & error alerts

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* React Router
* Material UI (MUI)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (file uploads)
* Cloudinary (image hosting)

---

## 📁 Project Structure

### Backend

```
backend/
├── config/
│   ├── cloudinary.js
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── movieController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   └── Movie.js
├── routes/
│   ├── authRoutes.js
│   └── movieRoutes.js
├── utils/
│   └── queue.js
├── server.js
└── .env
```

### Frontend

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── Loader.jsx
│   │   ├── MovieCard.jsx
│   │   └── movies/
│   │       ├── MovieGrid.jsx
│   │       ├── MovieItem.jsx
│   │       ├── MovieFormModal.jsx
│   │       └── DeleteConfirm.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   └── movies/
│   │       └── movieSlice.js
│   ├── pages/
│   │   ├── Auth.jsx
│   │   ├── Home.jsx
│   │   └── ManageMovies.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   └── main.jsx
```

---

## 🔐 Environment Variables

Create a `.env` file in `backend/`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

⚠️ **Cloudinary API key is mandatory for movie upload**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-repo/Movie-Management-System.git
cd movie-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔄 API Endpoints

### Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

### Movies

| Method | Endpoint               | Access | Description             |
| ------ | ---------------------- | ------ | ----------------------- |
| GET    | /api/movies            | Public | Get movies (pagination) |
| GET    | /api/movies/search?q=  | Public | Search movies           |
| GET    | /api/movies/sorted?by= | Public | Sort movies             |
| POST   | /api/movies            | Admin  | Add movie               |
| PUT    | /api/movies/:id        | Admin  | Update movie            |
| DELETE | /api/movies/:id        | Admin  | Delete movie            |

---

## 🧪 Important Notes

* **Do NOT manually set Content‑Type** when sending `FormData`
* Multer handles multipart form data automatically
* Admin middleware must be written with proper `{}` blocks
* Pagination defaults to **10 movies per page**

---


## 👨‍💻 Author

**Asmit Gawande**
Built for learning, interviews, and real‑world MERN architecture 🚀

---

