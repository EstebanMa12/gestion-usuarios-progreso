export function SidebarItem(href: string, icon: string, label: string) {
  return `
    <a href="${href}" class="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 gap-2">
      ${icon}
      ${label}
    </a>
  `;
}