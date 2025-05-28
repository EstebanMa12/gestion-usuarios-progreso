import { RegisterButton } from "../components/RegisterButton";
import type { User } from "../schemas/auth";
import { UserStorage } from "../utils/userStorage";
export function DashboardPage() {

const userData = JSON.parse(localStorage.getItem('user') || '{}');
if(!userData){
  window.location.href = '/';
  return '';
}
const users = UserStorage.getAll();

return `
    <div class="p-6 max-w-6xl mx-auto">
    <div class="flex w-full  items-center justify-end">
      ${RegisterButton()}
    </div>
      <div class="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="searchInput" class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input type="text" id="searchInput" placeholder="Buscar por nombre o email..." 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="roleFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por rol</label>
            <select id="roleFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Todos los roles</option>
              <option value="student">Estudiante</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div>
            <label for="routeFilter" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por ruta</label>
            <select id="routeFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Todas las rutas</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Lista de usuarios -->
      <div id="usersContainer" class="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        ${users.length === 0 ? renderEmptyState() : renderUsersTable(users)}
      </div>
    </div>
  `;
}

function renderEmptyState(): string {
  return `
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
      <p class="mt-1 text-sm text-gray-500">Comienza registrando el primer usuario del sistema.</p>
      <div class="mt-6">
        <a href="/register" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Registrar Usuario
        </a>
      </div>
    </div>
  `
}

function renderUsersTable(users: User[]): string {
  return `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruta</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de registro</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody id="usersTableBody" class="bg-white divide-y divide-gray-200">
          ${users.map((user) => renderUserRow(user)).join("")}
        </tbody>
      </table>
    </div>
  `
}

function renderUserRow(user: User): string {
  const roleLabels = {
    student: "Estudiante",
    tutor: "Tutor",
    admin: "Administrador",
  }

  const routeLabels = {
    frontend: "Frontend",
    backend: "Backend",
    fullstack: "Fullstack",
  }

  const roleColors = {
    student: "bg-blue-100 text-blue-800",
    tutor: "bg-green-100 text-green-800",
    admin: "bg-purple-100 text-purple-800",
  }

  return `
    <tr data-user-id="${user.id}">
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <svg class="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">${user.name}</div>
            <div class="text-sm text-gray-500">${user.email}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}">
          ${roleLabels[user.role]}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${routeLabels[user.route]}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${new Date(user.createdAt).toLocaleDateString("es-ES")}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="editUser('${user.id}')" class="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
        <button onclick="deleteUser('${user.id}')" class="text-red-600 hover:text-red-900">Eliminar</button>
      </td>
    </tr>
  `
}

export function setupUsersPage(): void {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement
  const roleFilter = document.getElementById("roleFilter") as HTMLSelectElement
  const routeFilter = document.getElementById("routeFilter") as HTMLSelectElement

  // Configurar filtros
  if (searchInput && roleFilter && routeFilter) {
    const filterUsers = () => {
      const searchTerm = searchInput.value.toLowerCase()
      const selectedRole = roleFilter.value
      const selectedRoute = routeFilter.value

      const users = UserStorage.getAll()
      const filteredUsers = users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
        const matchesRole = !selectedRole || user.role === selectedRole
        const matchesRoute = !selectedRoute || user.route === selectedRoute

        return matchesSearch && matchesRole && matchesRoute
      })

      updateUsersTable(filteredUsers)
    }

    searchInput.addEventListener("input", filterUsers)
    roleFilter.addEventListener("change", filterUsers)
    routeFilter.addEventListener("change", filterUsers)
  }
  // Configurar funciones globales para los botones
  ;(window as any).editUser = (userId: string) => {
    window.location.href = `/edit-user?id=${userId}`
  }
  ;(window as any).deleteUser = (userId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      UserStorage.delete(userId)
      const row = document.querySelector(`tr[data-user-id="${userId}"]`)
      if (row) {
        row.remove()
      }

      // Verificar si no quedan usuarios
      const remainingUsers = UserStorage.getAll()
      if (remainingUsers.length === 0) {
        const container = document.getElementById("usersContainer")
        if (container) {
          container.innerHTML = renderEmptyState()
        }
      }
    }
  }
}

function updateUsersTable(users: User[]): void {
  const tableBody = document.getElementById("usersTableBody")
  if (tableBody) {
    tableBody.innerHTML = users.map((user) => renderUserRow(user)).join("")
  }
}
