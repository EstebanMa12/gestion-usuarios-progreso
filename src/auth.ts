import { createIcons, LogIn, UserCog } from "lucide";
import Swal from "sweetalert2";
import { loginSchema } from "./schemas/user";

export function loginPage() {
  const app = document.getElementById('app');
  if (!app) return

  app.innerHTML = `
    <body class="antialiased bg-gradient-to-br from-green-50 to-green-100">
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
          <!-- Left side - Branding -->
          <div class="w-full md:w-5/12 bg-gradient-to-br from-green-600 to-green-700 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full opacity-10">
              <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
              </svg>
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5" />
                </pattern>
              </defs>
            </div>
            <div class="relative z-10">
              <div class="mb-6 inline-block p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <i data-lucide="user-cog" class="w-10 h-10 text-white"></i>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Progreso Educa </h1>
              <p class="text-green-100 text-lg md:text-xl max-w-md">
                Gestiona el avance de tus estudiantes y registra sus progresos de manera eficiente
              </p>
              <div class="mt-12 flex space-x-3">
                <div class="w-3 h-3 rounded-full bg-white opacity-50"></div>
                <div class="w-3 h-3 rounded-full bg-white"></div>
                <div class="w-3 h-3 rounded-full bg-white opacity-50"></div>
              </div>
            </div>
          </div>
          
          <!-- Right side - Login Form -->
          <div class="w-full md:w-7/12 p-8 md:p-12 lg:p-16">
            <div class="max-w-md mx-auto">
              <h2 class="text-3xl font-bold text-gray-800 mb-8">Inicia sesión</h2>
              <form id="loginForm" class="space-y-6">
                <div class="space-y-2">
                  <label for="email" class="text-sm font-medium text-gray-700">Email</label>
                  <div class="relative">
                    <input
                      type="text"
                      id="email"
                      placeholder="Por favor inserte su email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 bg-gray-50"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label for="password" class="text-sm font-medium text-gray-700">Contraseña</label>
                    <a href="#" class="text-sm text-green-600 hover:text-green-800 transition-colors">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div class="relative">
                    <input
                      type="password"
                      id="password"
                      placeholder="Por favor inserte su contraseña"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 bg-gray-50"
                    />
                  </div>
                </div>
                
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700">Recordarme</label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    class="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <i data-lucide="log-in" class="w-5 h-5"></i>
                      <span>Iniciar sesión</span>
                    </div>
                  </button>
                </div>
              </form>
              
              <div class="mt-8 text-center">
                <p class="text-sm text-gray-600">
                  ¿No tienes una cuenta? <a href="#" class="font-medium text-green-600 hover:text-green-800 transition-colors">Contacta con administración</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  `
  createIcons({
    icons: {
      UserCog,
      LogIn
    }
  });

  const loginForm = document.getElementById('loginForm');

  // Toggle password visibility functionality
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const target = event.target as typeof event.target & {
        email: { value: string };
        password: { value: string };
      };

      const result = loginSchema.safeParse({
        email: target.email.value,
        password: target.password.value,
      });

      if (!result.success) {
        Swal.fire({
          title: 'Error',
          text: result.error.errors.map(e => e.message).join(', '),
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      const { email, password } = result.data;

      const users: Record<string, string> = {
        'admin@demo.com': 'Admin123',
        'tutor@demo.com': 'Tutor123'
      };
      if (users[email] && users[email] === password) {
        localStorage.setItem('user', JSON.stringify({ email }));
        Swal.fire({
          title: 'Éxito',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          confirmButtonText: 'Aceptar', 
          confirmButtonColor: '#00a63e'
        }).then(() => {
          window.location.href = '#/dashboard';
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#00a63e'

        });
      }
    });
  }
}