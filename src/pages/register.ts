import { showNotification } from "../components/Notification";
import { UserForm } from "../components/UserForm";

export function RegisterPage(): string {
  return `
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a href="/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Registrar Usuario</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div id="registerFormContainer"></div>
    </div>
  `
}

export function setupRegisterPage(): void {
  const container = document.getElementById("registerFormContainer")
  if (!container) return

  new UserForm({
    container,
    onSave: () => {
      showNotification("Usuario registrado exitosamente", "success")

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    },
    onCancel: () => {
      window.location.href = "/dashboard"
    },
  })
}

