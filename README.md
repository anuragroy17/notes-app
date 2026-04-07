# 📝 Notes App

[![React Version](https://img.shields.io/badge/React-18.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Firebase Version](https://img.shields.io/badge/Firebase-9.8.1-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![MUI Version](https://img.shields.io/badge/MUI-5.8.6-007FFF?style=for-the-badge&logo=mui)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A sleek, high-performance notes application designed for a modern user experience. Built with **React 18**, **Material UI**, and **Firebase**, it offers seamless authentication, real-time data persistence, and a beautiful interface that adapts to your preferences.

---

## ✨ Key Features

-   🔐 **Firebase Authentication**: Secure login, registration, and password recovery.
-   ☁️ **Cloud Storage**: Notes are synced in real-time across devices using Firebase Firestore.
-   🌓 **Dynamic Theme Engine**: Smoothly toggle between Light and Dark modes.
-   📱 **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
-   ⚡ **Premium UI/UX**: Built with Material UI v5 for a polished, state-of-the-art feel.
-   🔔 **Interactive Feedback**: Instant notifications via Snackbars and polished Backdrop loaders.

---

## 🛠️ Tech Stack

### Frontend
-   **React (v18.1.0)**: Modern component-based architecture.
-   **React Router (v6.3.0)**: Robust routing for a single-page application experience.
-   **Material UI (v5.8.6)**: Premium component library for high-end aesthetics.
-   **Emotion**: Powerful CSS-in-JS styling.

### Backend & Infrastructure
-   **Firebase Auth**: Secure and scalable user authentication.
-   **Firebase Firestore**: Real-time NoSQL database for note persistence.
-   **Netlify**: Automated deployment and hosting.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/anuragroy17/notes-app.git
    cd notes-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Firebase**:
    -   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    -   Get your configuration object.
    -   Update `src/firebase.js` with your credentials.
    -   For local use add domain 'localhost' to authentication section in Firebase.

4.  **Run the application**:
    ```bash
    npm start
    ```

---

## 📂 Project Structure

```text
notes-app/
├── public/             # Static assets
├── src/
│   ├── components/     # UI, Layout, and Logic components
│   ├── context-api/    # Global state management
│   ├── shared/         # Themes and shared utilities
│   ├── App.js          # Root component & routing
│   ├── firebase.js     # Firebase configuration
│   └── index.js        # Entry point
└── package.json        # Dependencies & scripts
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/anuragroy17">Anurag Roy</a>
</p>