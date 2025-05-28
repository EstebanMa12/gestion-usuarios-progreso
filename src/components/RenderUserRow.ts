import type { User } from "../schemas/auth"
import { ToggleSwitch } from "./ToggleSwitch"
import { UserStorage } from "../utils/userStorage"

export function renderUserRow(user: User): string {
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
        ${ToggleSwitch(
          {id: `${user.id}`,
          checked: user.state,
          onChange: (checked: boolean) => UserStorage.updateState(user.id, checked),
          }
        )}

      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button id='editUserBtn' class="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
      </td>
    </tr>
  `
}