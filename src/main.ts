import { LoginPage } from './pages/auth';
import { DashboardPage } from './pages/dashboard';
import { MainLayout, setupSidebar } from './layouts/MainLayout';
import './style.css'
import { RegisterPage, setupRegisterPage } from './pages/register';

const app = document.getElementById('app');
const route = window.location.pathname

switch (route) {
  case '/':
  case '/login':
    if (app) {
       LoginPage();
    }
    break;
  case '/dashboard':
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
    break;

  case '/register':
    if (app) {
      app.innerHTML = MainLayout(RegisterPage())
      setupSidebar()
      setupRegisterPage()
    }

    // Logout functionality
    const registerLogoutBtn = document.getElementById("logoutBtn")
    if (registerLogoutBtn) {
      registerLogoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user")
        window.location.href = "/"
      })
    }
    break
  default:
    if (app) {
      app.innerHTML = '<h1>404 - Página no encontrada</h1>';
    }
    break;
}
