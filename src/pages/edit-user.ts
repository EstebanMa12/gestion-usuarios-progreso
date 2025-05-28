import { UserForm } from "../components/UserForm.js"
import type { User } from "../schemas/auth.js"
import { UserStorage } from "../utils/userStorage.js"

export function EditUserPage(): string {
  return `
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a href="/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <a href="/users" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Usuarios</a>
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Editar Usuario</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div id="editFormContainer"></div>
    </div>
  `
}

export function setupEditUserPage(): void {
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get("id")

  if (!userId) {
    window.location.href = "/users"
    return
  }

  const user = UserStorage.getById(userId)
  if (!user) {
    alert("Usuario no encontrado")
    window.location.href = "/users"
    return
  }

  const container = document.getElementById("editFormContainer")
  if (!container) return

  new UserForm({
    container,
    editUser: user,
    onSave: (updatedUser: User) => {
      // Mostrar mensaje de éxito
      showNotification("Usuario actualizado exitosamente", "success")

      // Redirigir a la lista de usuarios después de un breve delay
      setTimeout(() => {
        window.location.href = "/users"
      }, 1500)
    },
    onCancel: () => {
      window.location.href = "/users"
    },
  })
}

function showNotification(message: string, type: "success" | "error" = "success"): void {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
  }`

  notification.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        ${
          type === "success"
            ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>'
            : '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>'
        }
      </svg>
      <span>${message}</span>
    </div>
  `

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.classList.remove("translate-x-full")
  }, 100)

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}
