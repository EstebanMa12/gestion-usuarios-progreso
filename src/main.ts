import { LoginPage } from './pages/auth';
import { DashboardPage } from './pages/dashboard';
import { MainLayout, setupSidebar } from './layouts/MainLayout';
import './style.css'

const app = document.getElementById('app');
const route = window.location.pathname

if (route === '/dashboard') {
  if (app) {
    app.innerHTML = MainLayout(DashboardPage())
    setupSidebar();
    
  }
  // Puedes agregar aquí lógica para eventos del layout, como logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = '/';
    });
  }
} else {
  if (app) LoginPage();
}

