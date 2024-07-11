import { z } from "zod"

export const userSchema = z.object({
    email: z.string().email({ message: "Debes usar un correo electrónico válido." }),
    fullName: z.string(),
    password: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres."}).max(1000).regex(/[0-9]/, 
        {message: "La contraseña debe incluir al menos 1 número"}),
})