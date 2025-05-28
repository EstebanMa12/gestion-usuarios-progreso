import { userSchema, type User, type UserFormData } from "../schemas/auth"


interface UserFormOptions {
  container: HTMLElement
  onSave?: (user: User) => void
  onCancel?: () => void
  editUser?: User
}

export class UserForm {
  private container: HTMLElement
  private onSave?: (user: User) => void
  private onCancel?: () => void
  private editUser?: User
  private form: HTMLFormElement | null = null
  private isSubmitting = false

  constructor(options: UserFormOptions) {
    this.container = options.container
    this.onSave = options.onSave
    this.onCancel = options.onCancel
    this.editUser = options.editUser
    this.render()
    this.attachEventListeners()
  }

  private render(): void {
    const isEditing = !!this.editUser

    this.container.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">
            ${isEditing ? "Editar Usuario" : "Registrar Nuevo Usuario"}
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            ${isEditing ? "Modifica los datos del usuario" : "Completa todos los campos para crear un nuevo usuario"}
          </p>
        </div>
        
        <form id="userForm" class="p-6 space-y-6">
          <!-- Nombre -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value="${this.editUser?.name || ""}"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ingresa el nombre completo"
            />
            <div id="name-error" class="mt-1 text-sm text-red-600 hidden"></div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value="${this.editUser?.email || ""}"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="usuario@ejemplo.com"
            />
            <div id="email-error" class="mt-1 text-sm text-red-600 hidden"></div>
          </div>

          <!-- Contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña *
            </label>
            <div class="relative">
              <input
                type="password"
                id="password"
                name="password"
                value="${this.editUser?.password || ""}"
                class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
              />
              <button
                type="button"
                id="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg id="eyeIcon" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
            <div id="password-error" class="mt-1 text-sm text-red-600 hidden"></div>
            <div class="mt-1 text-xs text-gray-500">
              La contraseña debe tener al menos 8 caracteres, una mayúscula y un número
            </div>
          </div>

          <!-- Rol -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
              Rol *
            </label>
            <select
              id="role"
              name="role"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Selecciona un rol</option>
              <option value="student" ${this.editUser?.role === "student" ? "selected" : ""}>Estudiante</option>
              <option value="tutor" ${this.editUser?.role === "tutor" ? "selected" : ""}>Tutor</option>
              <option value="admin" ${this.editUser?.role === "admin" ? "selected" : ""}>Administrador</option>
            </select>
            <div id="role-error" class="mt-1 text-sm text-red-600 hidden"></div>
          </div>

          <!-- Ruta -->
          <div>
            <label for="route" class="block text-sm font-medium text-gray-700 mb-2">
              Ruta de aprendizaje *
            </label>
            <select
              id="route"
              name="route"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Selecciona una ruta</option>
              <option value="frontend" ${this.editUser?.route === "frontend" ? "selected" : ""}>Frontend</option>
              <option value="backend" ${this.editUser?.route === "backend" ? "selected" : ""}>Backend</option>
              <option value="fullstack" ${this.editUser?.route === "fullstack" ? "selected" : ""}>Fullstack</option>
            </select>
            <div id="route-error" class="mt-1 text-sm text-red-600 hidden"></div>
          </div>

          <!-- Botones -->
          <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              id="submitBtn"
              class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-300 hover:text-green-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span id="submitText">${isEditing ? "Actualizar Usuario" : "Crear Usuario"}</span>
              <svg id="loadingIcon" class="hidden ml-2 h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
            <button
              type="button"
              id="cancelBtn"
              class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    `

    this.form = this.container.querySelector("#userForm") as HTMLFormElement
  }

  private attachEventListeners(): void {
    if (!this.form) return

    // Toggle password visibility
    const togglePassword = this.container.querySelector("#togglePassword") as HTMLButtonElement
    const passwordInput = this.container.querySelector("#password") as HTMLInputElement
    const eyeIcon = this.container.querySelector("#eyeIcon") as SVGElement

    togglePassword?.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password"
      passwordInput.type = isPassword ? "text" : "password"

      eyeIcon.innerHTML = isPassword
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`
    })

    // Real-time validation
    const inputs = this.form.querySelectorAll("input, select")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input as HTMLInputElement | HTMLSelectElement))
      input.addEventListener("input", () => this.clearFieldError(input as HTMLInputElement | HTMLSelectElement))
    })

    // Form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))

    // Cancel button
    const cancelBtn = this.container.querySelector("#cancelBtn") as HTMLButtonElement
    cancelBtn?.addEventListener("click", () => this.onCancel?.())
  }

  private validateField(field: HTMLInputElement | HTMLSelectElement): boolean {
    const fieldName = field.name as keyof UserFormData
    const value = field.value.trim()

    try {
      // Validate individual field
      const fieldSchema = userSchema.shape[fieldName]
      fieldSchema.parse(value)
      this.clearFieldError(field)
      return true
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message || "Campo inválido"
      this.showFieldError(field, errorMessage)
      return false
    }
  }

  private showFieldError(field: HTMLInputElement | HTMLSelectElement, message: string): void {
    const errorElement = this.container.querySelector(`#${field.name}-error`) as HTMLElement
    if (errorElement) {
      errorElement.textContent = message
      errorElement.classList.remove("hidden")
    }
    field.classList.add("border-red-300", "focus:border-red-500", "focus:ring-red-500")
    field.classList.remove("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
  }

  private clearFieldError(field: HTMLInputElement | HTMLSelectElement): void {
    const errorElement = this.container.querySelector(`#${field.name}-error`) as HTMLElement
    if (errorElement) {
      errorElement.classList.add("hidden")
    }
    field.classList.remove("border-red-300", "focus:border-red-500", "focus:ring-red-500")
    field.classList.add("border-gray-300", "focus:border-blue-500", "focus:ring-blue-500")
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault()

    if (this.isSubmitting) return

    const formData = new FormData(this.form!)
    const data: UserFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "student" | "tutor" | "admin",
      route: formData.get("route") as "frontend" | "backend" | "fullstack",
    }

    // Validate all fields
    let isValid = true
    const inputs = this.form!.querySelectorAll("input, select")
    inputs.forEach((input) => {
      if (!this.validateField(input as HTMLInputElement | HTMLSelectElement)) {
        isValid = false
      }
    })

    if (!isValid) return

    try {
      // Validate with Zod schema
      const validatedData = userSchema.parse(data)

      this.setSubmitting(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        ...validatedData,
        id: this.editUser?.id || this.generateId(),
        state: this.editUser?.state || false,
        createdAt: this.editUser?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      this.saveToLocalStorage(user)
      this.onSave?.(user)
    } catch (error: any) {
      console.error("Validation error:", error)
      if (error.errors) {
        error.errors.forEach((err: any) => {
          const field = this.form!.querySelector(`[name="${err.path[0]}"]`) as HTMLInputElement
          if (field) {
            this.showFieldError(field, err.message)
          }
        })
      }
    } finally {
      this.setSubmitting(false)
    }
  }

  private setSubmitting(submitting: boolean): void {
    this.isSubmitting = submitting
    const submitBtn = this.container.querySelector("#submitBtn") as HTMLButtonElement
    const submitText = this.container.querySelector("#submitText") as HTMLElement
    const loadingIcon = this.container.querySelector("#loadingIcon") as HTMLElement

    if (submitting) {
      submitBtn.disabled = true
      submitText.textContent = "Guardando..."
      loadingIcon.classList.remove("hidden")
    } else {
      submitBtn.disabled = false
      submitText.textContent = this.editUser ? "Actualizar Usuario" : "Crear Usuario"
      loadingIcon.classList.add("hidden")
    }
  }

  private saveToLocalStorage(user: User): void {
    const users = this.getUsersFromStorage()
    const existingIndex = users.findIndex((u) => u.id === user.id)

    if (existingIndex >= 0) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }

    localStorage.setItem("users", JSON.stringify(users))
  }

  private getUsersFromStorage(): User[] {
    const usersJson = localStorage.getItem("users")
    return usersJson ? JSON.parse(usersJson) : []
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  public destroy(): void {
    this.container.innerHTML = ""
  }
}
