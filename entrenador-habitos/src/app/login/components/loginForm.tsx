"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

function LoginForm() {
    const form = useForm()
    const submitHandler = async (values: any) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      console.log(response)
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
                <Input placeholder="example@email.com" {...field} />
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
                <Input placeholder="Introduce tu contraseña" {...field} />
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