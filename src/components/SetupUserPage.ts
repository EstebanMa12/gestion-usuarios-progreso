import { UserStorage } from "../utils/userStorage"
import { updateUsersTable } from "./UpdateUsersTable"

export function setupUsersPage(): void {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement
  const roleFilter = document.getElementById("roleFilter") as HTMLSelectElement


  // Configurar filtros
  if (searchInput && roleFilter) {
    const filterUsers = () => {
      const searchTerm = searchInput.value.toLowerCase()
      const selectedRole = roleFilter.value

      const users = UserStorage.getAll()
      const filteredUsers = users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
        const matchesRole = !selectedRole || user.role === selectedRole

        return matchesSearch && matchesRole 
      })

      updateUsersTable(filteredUsers)
    }

    searchInput.addEventListener("input", filterUsers)
    roleFilter.addEventListener("change", filterUsers)
  }

}