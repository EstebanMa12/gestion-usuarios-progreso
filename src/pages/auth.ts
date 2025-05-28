
import { createIcons, LogIn, UserCog } from "lucide";
import Swal from "sweetalert2";
import { loginSchema } from "../schemas/auth";


export function LoginPage() {
  const app = document.getElementById('app');
  if (!app) return ''

  app.innerHTML = `
    <body class="antialiased bg-gradient-to-br from-green-100 to-white">
    <div class="container px-6 mx-auto">
      <div
        class="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
      >
        <div class="flex flex-col w-full">
          <div>
            <i data-lucide="user-cog" class="
              w-16 h-16 text-green-600 mx-auto md:mx-0 mb-5
              md:mb-0
            "></i>
          </div>
          <h1 class="text-5xl text-gray-800 font-bold">
          Progreso Educa
          </h1>
          <p class="w-5/12 mx-auto md:mx-0 text-gray-500">
            Gestiona el avance de tus estudiantes y registra sus avances
          </p>
        </div>
        <div class="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
              Inicia sesión
            </h2>
            <form id="loginForm" class="w-full">
              <div id="input" class="flex flex-col w-full my-5">
                <label for="email" class="text-gray-500 mb-2"
                  >Email</label
                >
                <input
                  type="text"
                  id="email"
                  placeholder="Por favor inserte su email"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="input" class="flex flex-col w-full my-5">
                <label for="password" class="text-gray-500 mb-2"
                  >Password</label
                >
                <input
                  type="password"
                  id="password"
                  placeholder="Por favor inserte su contraseña"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="button" class="flex flex-col w-full my-5">
                <button
                  type="submit"
                  class="w-full py-4 bg-green-600 rounded-lg text-green-100"
                >
                  <div class="flex items-center justify-center gap-2">
                    <i data-lucide="log-in"></i>
                    <span class="font-bold"> Iniciar sesión</span>
                  </div>
                </button>
              </div>
            </form>
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