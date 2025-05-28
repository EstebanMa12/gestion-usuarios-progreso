import { RegisterButton } from "../components/RegisterButton";
export function DashboardPage() {

const userData = JSON.parse(localStorage.getItem('user') || '{}');
if(!userData){
  window.location.href = '/';
  return '';
}


return `
    <div class="p-6 max-w-6xl mx-auto">
    <div class="flex w-full  items-center justify-end">
      ${RegisterButton()}
    </div>
      <div class="overflow-x-auto">
        <table class="w-full table-auto border border-gray-200 shadow-md rounded">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Nombre</th>
              <th class="px-4 py-2 text-left">Correo</th>
              <th class="px-4 py-2 text-left">Rol</th>
              <th class="px-4 py-2 text-left">Ruta</th>
              <th class="px-4 py-2 text-left">Estado</th>
              <th class="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody id="usersTableBody" class="bg-white">
            <!-- Usuarios serán renderizados aquí -->
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderUsers(): void {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  tbody.innerHTML = users.map((user: any, index: number) => `
    <tr class="border-t">
      <td class="px-4 py-2">${user.name}</td>
      <td class="px-4 py-2">${user.email}</td>
      <td class="px-4 py-2">${user.role}</td>
      <td class="px-4 py-2">${user.track}</td>
      <td class="px-4 py-2">
        <span class="inline-block px-2 py-1 text-sm rounded ${user.active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}">
          ${user.active ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td class="px-4 py-2">
        <button class="text-sm text-blue-600 hover:underline" onclick="window.location.href='#/progreso?user=${index}'">Ver progreso</button>
      </td>
    </tr>
  `).join('');
}
