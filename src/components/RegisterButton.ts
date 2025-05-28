export function RegisterButton() {
  return `
  <button
      id="registerUserBtn"
      class=" flex items-center gap-2 mb-2 px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-300 transition-colors duration-200 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm text-sm font-semibold"
      onclick="window.location.href='/register-user'"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-plus-icon lucide-user-round-plus"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/></svg>     
          <span class="text-sm">Registrar Usuario</span>
      </button>
    `
}