import { createIcons, GraduationCap } from 'lucide';
import { SidebarItem } from '../components/SidebarItem';
export function MainLayout(content: string) {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return `
    <div class="flex h-screen bg-gray-50">
      <!-- Mobile overlay -->
      <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-10 z-40 lg:hidden hidden"></div>
      <!-- Sidebar -->
      <aside id="sidebar" class="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out">
        <div class="flex flex-col h-full">
          <!-- Logo/Brand -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-green-600 bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" 
                height="24" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round" class="lucide 
                lucide-graduation-cap-icon 
                lucide-graduation-cap">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
                  <path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
                </svg>
              </div>
              <span class="text-xl font-semibold text-gray-900">Progreso Educa</span>
            </div>
            <!-- Close button for mobile -->
            <button id="sidebar-close" class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Navigation -->
          <nav class="flex-1 px-4 py-6 space-y-2">
          ${SidebarItem('/dashboard', '<svg class="text-gray-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>', 'Dashboard')}
          </nav>
          
          <!-- User section -->
          <div class="p-4 border-t border-gray-200">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">Usuario</p>
                <p class="text-xs text-gray-500 truncate">${user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Main content -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <!-- Mobile menu button -->
              <button id="sidebar-toggle" class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <h1 class="text-xl font-semibold text-gray-900">Panel de usuarios</h1>
            </div>
            
            <div class="flex items-center space-x-4">
              
              <!-- Logout button -->
              <button id="logoutBtn" class="inline-flex items-center px-4 py-2 border border-transparent text-sm  rounded-md text-red-700 font-semibold bg-red-100 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 gap-2">
               <svg class="w-4 h-4 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
        
        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6">
          <div class="max-w-7xl mx-auto">
            ${content}
          </div>
        </main>
      </div>
    </div>

    `;
  createIcons({
    icons: {
      GraduationCap
    }
  });
}

export function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (!sidebar || !sidebarToggle || !sidebarOverlay) return;

  function openSidebar() {
    sidebar?.classList.remove('-translate-x-full');
    sidebarOverlay?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeSidebar() {
    sidebar?.classList.add('-translate-x-full');
    sidebarOverlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  sidebarToggle.addEventListener('click', openSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
      closeSidebar();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  });
}