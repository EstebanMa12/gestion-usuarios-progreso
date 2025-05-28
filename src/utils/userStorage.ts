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

  static updateState(userId: string, newState: boolean): void {
    const users = this.getAll()
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex >= 0) {
      users[userIndex].state = newState
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users))
    }
  }

  static getByEmail(email: string): User | undefined {
    const users = this.getAll()
    return users.find((user) => user.email === email)
  }
  static getByRole(role: string): User[] {
    const users = this.getAll()
    return users.filter((user) => user.role === role)
  }

  static addProgress(userId: string, entry: { date: string; comment: string; score: number }) {
    const users = this.getAll();
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex >= 0) {
      if (!Array.isArray((users[userIndex] as any).progress)) {
        (users[userIndex] as any).progress = [];
      }
      (users[userIndex] as any).progress.push(entry);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }
  }
}
