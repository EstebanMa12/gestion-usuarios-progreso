import { LoginPage } from './pages/auth';
import { DashboardPage } from './pages/dashboard';
import { MainLayout, setupSidebar } from './layouts/MainLayout';
import './style.css'
import { RegisterPage, setupRegisterPage } from './pages/register';
import { EditUserPage, setupEditUserPage } from './pages/edit-user';
import { UserStorage } from './utils/userStorage';

const app = document.getElementById('app');
const route = window.location.pathname
const user = localStorage.getItem('user');

const isLoggedIn = !!user;

switch (route) {
  case '/':
  case '/login':
    if (app) {
      LoginPage();
    }
    break;

  case '/dashboard':
    if (!isLoggedIn) {
      window.location.href = '/login';
      break;
    }
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

    const editUserBtn = document.getElementById('editUserBtn')
    if (editUserBtn) {
      editUserBtn.addEventListener('click', () => {
        console.log('Edit User button clicked');
        const userId = editUserBtn.getAttribute('data-user-id');
        console.log('User ID:', userId);
        if (userId) {
          window.location.href = `/edit-user?id=${userId}`;
        }
      });
    }
    const deleteUserBtn = document.getElementById('deleteUserBtn')
    if (deleteUserBtn) {
      deleteUserBtn.addEventListener('click', () => {
        const userId = deleteUserBtn.getAttribute('data-user-id');
        if (userId && confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
          localStorage.removeItem('user-' + userId);
          window.location.href = '/dashboard';
        }
      });
    }

    document.querySelectorAll('.toggle-switch').forEach((el) => {
      el.addEventListener('change', (e) => {
        const input = e.target as HTMLInputElement;
        const userId = input.id;
        const checked = input.checked;
        UserStorage.updateState(userId, checked);
      });
    });
    break;

  case '/register':
    if (!isLoggedIn) {
      window.location.href = '/login';
      break;
    }
    if (app) {
      app.innerHTML = MainLayout(RegisterPage())
      setupSidebar()
      setupRegisterPage()
    }
    const registerLogoutBtn = document.getElementById("logoutBtn")
    if (registerLogoutBtn) {
      registerLogoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user")
        window.location.href = "/"
      })
    }
    break

  case "/edit-user":
    if (!isLoggedIn) {
      window.location.href = '/login';
      break;
    }
    if (app) {
      app.innerHTML = MainLayout(EditUserPage())
      setupSidebar()
      setupEditUserPage()
    }
    const editLogoutBtn = document.getElementById("logoutBtn")
    if (editLogoutBtn) {
      editLogoutBtn.addEventListener("click", () => {
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
