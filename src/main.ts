import { loginPage } from './pages/auth';
import { dashboardPage } from './pages/dashboard';
import './style.css'


const route = window.location.pathname
if (route === '/dashboard') {
  dashboardPage();
} else {
  loginPage();
}


