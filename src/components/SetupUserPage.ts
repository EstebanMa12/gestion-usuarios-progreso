import { UserStorage } from "../utils/userStorage"
import { renderEmptyState } from "./EmptyState"
import { updateUsersTable } from "./UpdateUsersTable"

export function setupUsersPage(): void {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement
  const roleFilter = document.getElementById("roleFilter") as HTMLSelectElement
  const routeFilter = document.getElementById("routeFilter") as HTMLSelectElement

  // Obtener usuario actual para saber si es admin
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = userData.role === 'admin';

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
  (window as any).editUser = (userId: string) => {
    window.location.href = `/edit-user?id=${userId}`
  }
    ; (window as any).deleteUser = (userId: string) => {
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
            container.innerHTML = renderEmptyState(isAdmin)
          }
        }
      }
    }
}