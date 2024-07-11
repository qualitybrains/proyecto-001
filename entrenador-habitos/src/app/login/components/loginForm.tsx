"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/ui/password-input'

function LoginForm() {
    const form = useForm()
    const router = useRouter()
    const submitHandler = async (values: any) => {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password
      });
      if (response?.status === 200) {
        router.push("/");
      }
      else( form.setError("email", { message: "Credenciales incorrectas" }))
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
          <Button type="button" variant="outline"><a href="/signup">Registrarse</a></Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm