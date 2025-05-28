import { showNotification } from "../components/Notification.js"
import { UserForm } from "../components/UserForm.js"
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
    window.location.href = "/dashboard"
    return
  }

  const user = UserStorage.getById(userId)
  if (!user) {
    alert("Usuario no encontrado")
    window.location.href = "/dashboard"
    return
  }

  const container = document.getElementById("editFormContainer")
  if (!container) return

  new UserForm({
    container,
    editUser: user,
    onSave: () => {
      // Mostrar mensaje de éxito
      showNotification("Usuario actualizado exitosamente", "success")

      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    },
    onCancel: () => {
      window.location.href = "/dashboard"
    },
  })
}
