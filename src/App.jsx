import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import BottomNav from './components/BottomNav';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CartPage from './pages/CartPage';
import WalletPage from './pages/WalletPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';

// Admin
import AdminLayout from './admin/AdminLayout';
import DashboardPage from './admin/pages/DashboardPage';

// وضع التطوير - تجاوز تسجيل الدخول
const DEV_MODE = false;

function UserApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </>
  );
}

function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/purchases" element={<div>Purchases - Coming Soon</div>} />
        <Route path="/admin/courses" element={<div>Courses - Coming Soon</div>} />
        <Route path="/admin/sales" element={<div>Sales - Coming Soon</div>} />
        <Route path="/admin/users" element={<div>Users - Coming Soon</div>} />
        <Route path="/admin/refunds" element={<div>Refunds - Coming Soon</div>} />
        <Route path="/admin/support" element={<div>Support - Coming Soon</div>} />
        <Route path="/admin/settings/ads" element={<div>Ads - Coming Soon</div>} />
        <Route path="/admin/settings/master" element={<div>Master - Coming Soon</div>} />
        <Route path="/admin/settings/zaincash" element={<div>Zain Cash - Coming Soon</div>} />
        <Route path="/admin/settings/categories" element={<div>Categories - Coming Soon</div>} />
        <Route path="/admin/settings/algorithm" element={<div>Algorithm - Coming Soon</div>} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoggedIn, login, user } = useAuth();

  if (showSplash) {
    return <SplashScreen onFinish={() => {
      setShowSplash(false);
      if (DEV_MODE && !isLoggedIn) {
        login({ name: 'مدير', email: 'admin@dentlearn.com', role: 'admin' });
      }
    }} />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  const isAdmin = user?.role === 'admin';

  return isAdmin ? <AdminApp /> : <UserApp />;
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
