import zod from "zod"

export const userSchema = zod.object({
    email: zod.string().email({ message: "Debes usar un correo electrónico válido." }),
    fullName: zod.string(),
    password: zod.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres."}).max(1000),
})