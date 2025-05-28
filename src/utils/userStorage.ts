import type { User } from "../schemas/auth"


export class UserStorage {
  private static readonly STORAGE_KEY = "users"

  static getAll(): User[] {
    const usersJson = localStorage.getItem(this.STORAGE_KEY)
    return usersJson ? JSON.parse(usersJson) : []
  }

  static getById(id: string): User | undefined {
    const users = this.getAll()
    return users.find((user) => user.id === id)
  }

  static save(user: User): void {
    const users = this.getAll()
    const existingIndex = users.findIndex((u) => u.id === user.id)

    if (existingIndex >= 0) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users))
  }

  static delete(id: string): boolean {
    const users = this.getAll()
    const filteredUsers = users.filter((user) => user.id !== id)

    if (filteredUsers.length !== users.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers))
      return true
    }

    return false
  }

  static clear(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}
