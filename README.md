# Murmur – Mobile Social Application

A cross-platform mobile application built with **React Native** and **TypeScript** that allows users to share "murmurs," follow friends, and engage with a global timeline. This project was developed as part of a technical evaluation.

<img width="49%" alt="Screenshot_1767890088" src="https://github.com/user-attachments/assets/9df49c09-0976-4736-b8ba-1d20e659fae6" />
<img width="49%" alt="Screenshot_1767890095" src="https://github.com/user-attachments/assets/f8b090dd-9bbf-4ddb-bceb-6e453eb0bdea" />
<img width="49%" alt="Screenshot_1767894159" src="https://github.com/user-attachments/assets/6ea0a67c-e3f8-4177-8bd4-ef5afd403788" />



## 🚀 Features

- **Authentication**: Secure Signup and Signin with JWT persistence.
- **Global Timeline**: View murmurs from users you follow with **infinite scroll pagination** (10 per page).
- **Social Interactions**: Follow/Unfollow users and LIKE murmurs.
- **Own Detail**: Edit bio, change password, and manage your own posts.
- **Other User Detail**: View user stats (Followers/Following) and their specific murmur history.
- **Content Management**: Create new murmurs and delete your own posts.

## 🛠 Tech Stack

- **Frontend**: React Native (via Expo or CLI), TypeScript.
- **State Management**: Context API.
- **Navigation**: React Navigation (Stack & Tabs).
- **Backend**: Node.js, Express JS, MongoDB (Mongoose).

---

## 📂 Project Structure

```text
src/
├── api/            # Axios configurations and API services
├── components/     # Reusable UI components (Buttons, MurmurCard, Inputs)
├── hooks/          # Custom hooks (useAuth, useTimeline)
├── navigation/     # Root, Auth, and App (Tab) navigators
├── screens/        # Main screen components (Timeline, Profile, Detail)
├── types/          # TypeScript interfaces and type definitions
└── utils/          # Formatting tools and constants

```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- React Native Environment (Android Studio / Xcode)

### Step 1: Clone the Repository

```bash
git clone https://github.com/ferdoushasanpr/Murmur-React-Native-Application.git
cd Murmur-React-Native-Application

```

### Step 2: Install Dependencies

```bash
npm install

```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
API_URL=http://your-backend-ip:5000/api

```

### Step 4: Run the Application

```bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android

```

---
