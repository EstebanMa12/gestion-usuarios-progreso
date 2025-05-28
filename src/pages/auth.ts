import { createIcons, LogIn, Mail, RectangleEllipsis, UserCog } from "lucide";
import Swal from "sweetalert2";
import { loginSchema } from "../schemas/user";

export function LoginPage() {
  const app = document.getElementById('app');
  if (!app) return ''

  app.innerHTML = `
    <body class="antialiased min-h-screen bg-gradient-to-br from-green-200 via-white to-green-100 flex items-center justify-center">
      <div class="container px-4 mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div class="flex flex-col w-full md:w-1/2 items-center md:items-start mb-10 md:mb-0">
          <img src="/public/libro-abierto.jpg" alt="Logo" class="w-20 h-20 mb-6 rounded-full shadow-lg border-4 border-green-200 bg-white" />
          <h1 class="text-5xl text-green-700 font-extrabold mb-2 drop-shadow-lg">Progreso Educa</h1>
          <p class="w-full md:w-8/12 text-gray-600 text-lg mb-4 text-center md:text-left">Gestiona el avance de tus estudiantes y registra sus avances</p>
          <span class="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold shadow">Bienvenido de nuevo</span>
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center">
          <div class="bg-white/90 p-10 flex flex-col w-full max-w-md shadow-2xl rounded-3xl border border-green-100">
            <h2 class="text-3xl font-bold text-green-700 text-center mb-7">Inicia sesión</h2>
            <form id="loginForm" class="w-full space-y-6">
              <div class="flex flex-col w-full">
                <label for="email" class="text-gray-500 mb-2 font-semibold flex items-center gap-2">
                  <i data-lucide="user-cog" class="w-5 h-5 text-green-500"></i> Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Por favor inserte su email"
                  class="appearance-none border-2 border-green-100 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-lg transition-all duration-200"
                />
              </div>
              <div class="flex flex-col w-full">
                <label for="password" class="text-gray-500 mb-2 font-semibold flex items-center gap-2">
                  <i data-lucide="log-in" class="w-5 h-5 text-green-500"></i> Contraseña
                </label>
                <div class="relative border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-400 focus:shadow-lg transition-all duration-200">
                  <input
                    type="password"
                    id="password"
                    placeholder="Inserte su contraseña"
                    class="appearance-non  px-4 py-3 pr-10 placeholder-gray-400 focus:outline-none w-full rounded-xl"
                  />
                  <button
                    type="button"
                    id="togglePassword"
                    tabindex="-1"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg id="eyeIcon" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                  </button>
                </div>
              </div>
              <div class="flex flex-col w-full mt-2">
                <button
                  type="submit"
                  class="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <div class="flex items-center justify-center gap-2">
                    <i data-lucide="log-in"></i>
                    <span>Iniciar sesión</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  `
  createIcons({
    icons: {
      UserCog,
      LogIn,
      Mail,
      RectangleEllipsis,
    }
  });

  // Password visibility toggle
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;
  const togglePassword = document.getElementById('togglePassword') as HTMLButtonElement | null;
  const eyeIcon = document.getElementById('eyeIcon') as HTMLElement | null;

  if (togglePassword && passwordInput && eyeIcon) {
    let visible = false;
    togglePassword.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.type === "password"
      visible = !visible;
      passwordInput.type = visible ? 'text' : 'password';
      eyeIcon.innerHTML = isPassword
        ?  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`
    });
  }

  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const target = event.target as typeof event.target & {
        email: { value: string };
        password: { value: string };
      };

      if (!target.email.value || !target.password.value) return;

      const result = loginSchema.safeParse({
        email: target.email.value,
        password: target.password.value,
      });

      if (!result.success) {
        Swal.fire({
          title: 'Error',
          text: result.error.errors.map((e: { message: string }) => e.message).join(', '),
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
        const role = email.includes('admin') ? 'admin' : 'tutor';
        localStorage.setItem('user', JSON.stringify({ email, role }));
        Swal.fire({
          title: 'Éxito',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#00a63e'
        }).then(() => {
          window.location.href = '/dashboard';
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