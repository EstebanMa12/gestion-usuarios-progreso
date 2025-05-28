import { UserStorage } from "../utils/userStorage";
import { renderHistoryItem } from "./HistoryItem";

interface ProgressEntry {
  date: string;
  comment: string;
  score: number;
}

export function showUserProgressModal(userId: string): void {
  const user = UserStorage.getById(userId);
  if (!user) {
    alert("Usuario no encontrado");
    return;
  }

  const progressKey = `progress_${userId}`;
  const progressEntries: ProgressEntry[] = JSON.parse(localStorage.getItem(progressKey) || "[]");

  const modalHtml = `
<div id="progressModal" class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
  <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-200 animate-in zoom-in-95">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Progreso de ${user.name}</h2>
        <button id="closeModalX" class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="overflow-y-auto max-h-[calc(90vh-140px)]">
      <!-- Historial Section -->
      <div class="px-6 py-4 border-b border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 class="text-lg font-semibold text-gray-800">Historial de Progreso</h3>
        </div>
        
        <div id="progressHistory" class="space-y-3 max-h-60 overflow-y-auto">
          ${progressEntries.map(entry => `
            ${renderHistoryItem(entry)}
          `).join("")}
        </div>
      </div>

      <!-- Form Section -->
      <div class="px-6 py-6">
        <div class="flex items-center gap-2 mb-6">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 class="text-lg font-semibold text-gray-800">Agregar Nuevo Progreso</h3>
        </div>

        <form id="progressForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="date" class="block text-sm font-semibold text-gray-700">
                Fecha
                <span class="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              >
            </div>

            <div class="space-y-2">
              <label for="score" class="block text-sm font-semibold text-gray-700">
                Puntaje (0-100)
                <span class="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                id="score" 
                name="score" 
                min="0" 
                max="100" 
                required 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                placeholder="Ej: 85"
              >
            </div>
          </div>

          <div class="space-y-2">
            <label for="comment" class="block text-sm font-semibold text-gray-700">
              Comentario
              <span class="text-red-500">*</span>
            </label>
            <textarea 
              id="comment" 
              name="comment" 
              required 
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
              placeholder="Describe el progreso, logros o observaciones..."
            ></textarea>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
      <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button 
          type="button" 
          id="closeModal" 
          class="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          form="progressForm"
          class="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          Guardar Progreso
        </button>
      </div>
    </div>
  </div>
</div>
  `;

  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHtml;
  document.body.appendChild(modalContainer);

  const form = document.getElementById("progressForm") as HTMLFormElement;
  const closeBtn = document.getElementById("closeModal");
  const closeModalX = document.getElementById("closeModalX");

  if (closeModalX) {
    closeModalX.addEventListener("click", () => {
      document.body.removeChild(modalContainer);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modalContainer);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newEntry: ProgressEntry = {
        date: formData.get("date") as string,
        comment: formData.get("comment") as string,
        score: Number(formData.get("score"))
      };
      progressEntries.push(newEntry);
      localStorage.setItem(progressKey, JSON.stringify(progressEntries));
      const historyDiv = document.getElementById("progressHistory");
      if (historyDiv) {
        historyDiv.innerHTML += `
          ${renderHistoryItem(newEntry)}
        `;
      }
      form.reset();
    });
  }
}
