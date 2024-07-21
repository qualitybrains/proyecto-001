import { z } from 'zod';

export const taskSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El título de la tarea es requerido' })
    .max(50, { message: 'El título de la tarea debe tener como máximo 50 caracteres' }),
  description: z.string(),
  points: z
    .string()
    .min(1, { message: 'Los puntos de la tarea son requeridos' })
    .max(3, { message: 'Los puntos de la tarea deben ser de como máximo 3 digitos' }),
  status: z.number(),
});
