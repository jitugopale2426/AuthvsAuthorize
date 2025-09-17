
import './App.css'
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import Register from './components/Register'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from './components/UserPage';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/user" element={<UserPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
