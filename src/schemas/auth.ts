import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Contraseña muy corta'),
});

export const userSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  email: z.string().email('Correo inválido'),
  password: z.string()
    .min(8, 'Contraseña muy corta')
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, 'La contraseña debe tener al menos una mayúscula y un número'),
  role: z.enum(['student', 'tutor', 'admin'], {
    required_error: 'Rol es requerido',
    invalid_type_error: 'Rol debe ser student, tutor o admin',
  }),
  route: z.enum(['frontend', 'backend', 'fullstack'], {
    required_error: 'Ruta es requerida',
    invalid_type_error: 'Ruta debe ser frontend, backend o fullstack',
  }),

})