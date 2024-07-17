"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { userSchema } from '@/app/signup/components/userSchema'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/ui/password-input'

function LoginForm() {

    const form = useForm<z.infer<typeof userSchema>>({defaultValues: {email: "", password: ""}})
    const router = useRouter()
    const submitHandler = async (values: z.infer<typeof userSchema>) => {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password
      });
      if (response?.ok) {
        router.push("/");
      }
      if (response?.error) form.setError("email", { message: `${response.error}` })
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo *</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} required={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña *</FormLabel>
              <FormControl>
                <PasswordInput {...field} required={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-x-4'>
          <Button type="submit">Iniciar sesión</Button>
          <Button onClick={ () => router.push("/signup")} type="button" variant="outline">Registrarse</Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm