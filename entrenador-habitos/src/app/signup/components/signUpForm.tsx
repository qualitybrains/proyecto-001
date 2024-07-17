"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from './userSchema'
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { PasswordInput } from '@/components/ui/password-input';

function SignUpForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema), 
    defaultValues: {fullName: "", email: "", password: ""}
  })

  const submitHandler = async (values: z.infer<typeof userSchema>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if(response.status === 200) {
      router.push("/login")
    }
    if(response.status >= 400) {
      form.setError("email", { message: `${response.statusText}` })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Juan Perez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo *</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Debes usar un correo electrónico válido.
              </FormDescription>
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
                <PasswordInput placeholder="Introduce tu contraseña" {...field} />
              </FormControl>
              <FormDescription>
                Debe poseer mínimo 8 caracteres y al menos un número.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-x-4'>
          <Button type="submit">Registrarse</Button>
          <Button onClick={() => router.push("/login")} type="button" variant="outline">Volver</Button>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm