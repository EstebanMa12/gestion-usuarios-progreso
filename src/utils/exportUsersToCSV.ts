import type { User } from "../schemas/auth";

// Utilidad para exportar usuarios a CSV
export function exportUsersToCSV(users: User[]) {
  if (!users.length) {
    alert('No hay usuarios para exportar.');
    return;
  }
  const replacer = (key: any, value: null) => value === null ? '' : value;
  const header = Object.keys(users[0]);
  const csv = [
    header.join(','),
    ...users.map(row => header.map(fieldName => JSON.stringify(row[fieldName as keyof User], replacer)).join(','))
  ].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'usuarios.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
