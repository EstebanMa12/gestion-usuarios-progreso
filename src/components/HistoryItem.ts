export function renderHistoryItem(entry: { date: string; comment: string; score: number }): string {
  return `
    <div class="group bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="flex flex-col">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha</span>
                  <span class="text-sm font-semibold text-gray-900">${entry.date}</span>
                </div>
                <div class="flex flex-col md:col-span-2">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Comentario</span>
                  <span class="text-sm text-gray-700 leading-relaxed">${entry.comment}</span>
                </div>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Puntaje</span>
                  <div class="flex items-center gap-2">
                    <div class="w-16 bg-gray-200 rounded-full h-2">
                      <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${entry.score}%"></div>
                    </div>
                    <span class="text-sm font-bold text-blue-600">${entry.score}/100</span>
                  </div>
                </div>
              </div>
            </div>
            `
}