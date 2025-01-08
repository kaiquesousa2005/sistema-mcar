import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import VeiculosDetalhesPage from "./pages/VeiculosDetalhesPage";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
        </div>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/veiculo/:id" 
              element={
                <ProtectedRoute>
                  <VeiculosDetalhesPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

