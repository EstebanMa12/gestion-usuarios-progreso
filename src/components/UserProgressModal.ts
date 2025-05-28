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
    <div class="px-6 py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
          <h3 class="text-lg font-semibold text-gray-800">Resumen de Rendimiento</h3>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="statsContainer">
          <!-- Promedio General -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Promedio</span>
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div class="flex items-end gap-1">
              <span class="text-2xl font-bold text-blue-600" id="averageScore">
                ${progressEntries.length > 0 ? Math.round(progressEntries.reduce((sum, entry) => sum + entry.score, 0) / progressEntries.length) : 0}
              </span>
              <span class="text-sm text-gray-500 mb-1">/100</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                   style="width: ${progressEntries.length > 0 ? Math.round(progressEntries.reduce((sum, entry) => sum + entry.score, 0) / progressEntries.length) : 0}%"></div>
            </div>
          </div>

          <!-- Último Puntaje -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Último</span>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div class="flex items-end gap-1">
              <span class="text-2xl font-bold text-green-600" id="lastScore">
                ${progressEntries.length > 0 ? progressEntries[progressEntries.length - 1].score : 0}
              </span>
              <span class="text-sm text-gray-500 mb-1">/100</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" 
                   style="width: ${progressEntries.length > 0 ? progressEntries[progressEntries.length - 1].score : 0}%"></div>
            </div>
          </div>

          <!-- Mejor Puntaje -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Mejor</span>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <div class="flex items-end gap-1">
              <span class="text-2xl font-bold text-yellow-600" id="bestScore">
                ${progressEntries.length > 0 ? Math.max(...progressEntries.map(entry => entry.score)) : 0}
              </span>
              <span class="text-sm text-gray-500 mb-1">/100</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500" 
                   style="width: ${progressEntries.length > 0 ? Math.max(...progressEntries.map(entry => entry.score)) : 0}%"></div>
            </div>
          </div>

          <!-- Total Evaluaciones -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</span>
              <div class="w-3 h-3 bg-indigo-500 rounded-full"></div>
            </div>
            <div class="flex items-end gap-1">
              <span class="text-2xl font-bold text-indigo-600" id="totalEvaluations">
                ${progressEntries.length}
              </span>
              <span class="text-sm text-gray-500 mb-1">eval.</span>
            </div>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-indigo-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xs text-gray-600">evaluaciones</span>
            </div>
          </div>
        </div>

        <!-- Tendencia -->
        <div class="mt-4 p-3 bg-white rounded-lg border border-gray-200" id="trendContainer">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Tendencia</span>
            <div class="flex items-center gap-1" id="trendIndicator">
              ${(() => {
                if (progressEntries.length < 2) return '<span class="text-xs text-gray-500">Insuficientes datos</span>';
                const lastTwo = progressEntries.slice(-2);
                const trend = lastTwo[1].score - lastTwo[0].score;
                if (trend > 0) {
                  return `
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-green-600">Mejorando (+${trend})</span>
                  `;
                } else if (trend < 0) {
                  return `
                    <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-red-600">Descendiendo (${trend})</span>
                  `;
                } else {
                  return `
                    <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-600">Estable (${trend})</span>
                  `;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
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
      // Actualizar estadísticas
      updateStats();
      form.reset();
    });
  }

  // Función para actualizar las estadísticas del modal
  function updateStats() {
    const average = progressEntries.length > 0 ? Math.round(progressEntries.reduce((sum, entry) => sum + entry.score, 0) / progressEntries.length) : 0;
    const last = progressEntries.length > 0 ? progressEntries[progressEntries.length - 1].score : 0;
    const best = progressEntries.length > 0 ? Math.max(...progressEntries.map(entry => entry.score)) : 0;
    const total = progressEntries.length;
    const averageScore = document.getElementById("averageScore");
    const lastScore = document.getElementById("lastScore");
    const bestScore = document.getElementById("bestScore");
    const totalEvaluations = document.getElementById("totalEvaluations");
    if (averageScore) averageScore.textContent = String(average);
    if (lastScore) lastScore.textContent = String(last);
    if (bestScore) bestScore.textContent = String(best);
    if (totalEvaluations) totalEvaluations.textContent = String(total);
    // Barras de progreso
    const avgBar = averageScore?.parentElement?.parentElement?.querySelector('div.bg-gradient-to-r.from-blue-500');
    if (avgBar) (avgBar as HTMLElement).style.width = `${average}%`;
    const lastBar = lastScore?.parentElement?.parentElement?.querySelector('div.bg-gradient-to-r.from-green-500');
    if (lastBar) (lastBar as HTMLElement).style.width = `${last}%`;
    const bestBar = bestScore?.parentElement?.parentElement?.querySelector('div.bg-gradient-to-r.from-yellow-500');
    if (bestBar) (bestBar as HTMLElement).style.width = `${best}%`;
    // Tendencia
    const trendIndicator = document.getElementById("trendIndicator");
    if (trendIndicator) {
      if (progressEntries.length < 2) {
        trendIndicator.innerHTML = '<span class="text-xs text-gray-500">Insuficientes datos</span>';
      } else {
        const lastTwo = progressEntries.slice(-2);
        const trend = lastTwo[1].score - lastTwo[0].score;
        if (trend > 0) {
          trendIndicator.innerHTML = `
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm font-medium text-green-600">Mejorando (+${trend})</span>
          `;
        } else if (trend < 0) {
          trendIndicator.innerHTML = `
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm font-medium text-red-600">Descendiendo (${trend})</span>
          `;
        } else {
          trendIndicator.innerHTML = `
            <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm font-medium text-gray-600">Estable (${trend})</span>
          `;
        }
      }
    }
  }
}
