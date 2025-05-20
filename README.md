# NGO Food Management System

A full-stack web application to streamline food donation management for NGOs, enabling seamless tracking of donations, users, and inventory.

## 🚀 How to Run the Project Locally

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or via a cloud service)

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd foodmanagement-main
   ```

2. **Server Setup**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Client Setup**
   ```bash
   cd client
   npm install
   npm start
   ```

4. Visit `http://localhost:3000` to view the app in your browser.

## 🧰 Tech Stack Used
- **Frontend**: ReactJS, Bootstrap, AOS (Animate on Scroll)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **Other Libraries**: Axios, SweetAlert2, Chart.js, React Data Table

## ✅ Features Implemented
- Donor and Admin Authentication using JWT
- Role-based Access Control (RBAC)
- Admin Dashboard for:
  - Viewing/managing donations
  - User management
  - Inventory tracking
- Donation form with validation and file upload (via Multer)
- Toast & Alert notifications (SweetAlert2)
- Responsive design with Bootstrap for mobile and desktop
- Scroll animations with AOS
- Data visualizations using Chart.js
- Data tables with search and filter

## 🌟 Bonus Features
- Integrated Chart.js for real-time analytics
- Responsive tables using react-data-table-component
- SweetAlert2 integration for enhanced UX
- AOS integration for animated UI interactions

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

