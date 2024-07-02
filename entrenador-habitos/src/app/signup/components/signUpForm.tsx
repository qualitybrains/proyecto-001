"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from './userSchema'
import { z } from "zod"
import axios from "axios"

function SignUpForm() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema), 
    defaultValues: {fullName: "", email: "", password: ""}
  })

  const submitHandler = async (values: z.infer<typeof userSchema>) => {
    const response = await axios.post("http://localhost:3000/api/auth/register", values);
    if(response.status === 200) {
      alert("Registrado exitosamente")
    }
    if(response.status > 400) {
      alert("Error al registrar")
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
                <Input placeholder="Introduce tu contraseña" {...field} />
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
          <Button type="button" variant="outline"><a href="/">Volver</a></Button>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm