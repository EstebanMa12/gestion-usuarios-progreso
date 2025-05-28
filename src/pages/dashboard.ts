import { renderEmptyState } from "../components/EmptyState";
import { RegisterButton } from "../components/RegisterButton";
import { renderUsersTable } from "../components/RenderUserTable";
import { UserStorage } from "../utils/userStorage";
export function DashboardPage() {

const userData = JSON.parse(localStorage.getItem('user') || '{}');
if(!userData){
  window.location.href = '/';
  return '';
}
const users = UserStorage.getAll();
const isAdmin = userData.role === 'admin';

return `
    <div class="p-6 max-w-6xl mx-auto">
    <div class="flex w-full  items-center justify-end">
      ${isAdmin ? RegisterButton() : ''}
    </div>
      <div class="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="searchInput" class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input type="text" id="searchInput" placeholder="Buscar por email..." 
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
        </div>
      </div>

      <!-- Lista de usuarios -->
      <div id="usersContainer" class="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        ${users.length === 0 ? renderEmptyState(isAdmin) : renderUsersTable(users)}
      </div>
    </div>
  `;
}






