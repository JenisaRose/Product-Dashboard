# 📊 Product Dashboard

A modern **Full Stack Product & Client Management Dashboard** built for managing products, clients, subscriptions, payments, renewals, reports, and activity logs. The application provides administrators with a centralized platform to efficiently monitor client subscriptions and business operations.

---

## 🚀 Live Demo

**Frontend:** https://product-dashboard-gamma-azure.vercel.app

---

## ✨ Features

### 🔐 Authentication
- Secure Admin Login
- JWT Authentication
- Protected Routes
- Persistent Login using Local Storage

---

### 📦 Product Management
- Add Products
- Edit Products
- Delete Products
- Product Categories
- Product Status Management
- Product Search
- Category & Status Filters
- Duplicate Product Code Validation

---

### 👥 Client Management
- Add Clients
- Edit Clients
- Delete Clients
- Search Clients
- Active/Inactive Status
- Email Validation
- Internal Notes
- Duplicate Email Validation

---

### 🔗 Product Assignment Management
- Assign Products to Clients
- Multiple Subscription Plans
- Billing Cycle Selection
- Automatic Renewal Date Calculation
- Automatic Subscription Status
- Search & Filters
- Edit/Delete Assignments
- Duplicate Assignment Prevention

---

### 💳 Payment Tracking
- Track Total Amount
- Paid Amount
- Pending Amount
- Payment Status
- Last Payment Date
- Payment Remarks
- Automatic Payment Status Calculation
- Overdue Payment Detection

---

### 🔄 Renewal Management
- Upcoming Renewals
- Expired Renewals
- Renewal Window Indicators
- Days Remaining Calculation
- One-Click Subscription Renewal
- Automatic Renewal Date Update

---

### 📈 Dashboard
- Summary Cards
- Recent Products
- Recent Client Assignments
- Upcoming Renewals
- Product Distribution Chart
- Payment Status Chart

---

### 📄 Reports
- Generate Subscription Reports
- Payment Reports
- Renewal Reports
- Export Data

---

### 📝 Activity Log
- Product Activity
- Client Activity
- Subscription Updates
- Payment Status Changes
- Renewal History
- Admin Action Tracking

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Material UI (MUI)
- Axios
- React Router DOM
- React Hot Toast
- Framer Motion
- Lucide React
- Day.js
- Recharts

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- Mongoose
- dotenv

### Database
- MongoDB Atlas

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📂 Project Structure

```text
Product-Dashboard
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/JenisaRose/Product-Dashboard.git
```

---

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://your-render-backend-url/api
```

---

## 🔮 Future Enhancements

- Email Notifications for Renewals
- Role-Based Access Control
- Dark Mode
- Advanced Analytics
- PDF Report Generation
- Audit Trail Enhancements
- Multi-Admin Support

---

## 👩‍💻 Author

**Jenisa Rose**

GitHub: https://github.com/JenisaRose

---

## 📄 License

This project is developed for educational and internship purposes.
