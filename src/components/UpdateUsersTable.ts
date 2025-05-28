import type { User } from "../schemas/auth"
import { renderUserRow } from "./RenderUserRow"

export function updateUsersTable(users: User[]): void {
  const tableBody = document.getElementById("usersTableBody")
  if (tableBody) {
    tableBody.innerHTML = users.map((user) => renderUserRow(user)).join("")
  }
}