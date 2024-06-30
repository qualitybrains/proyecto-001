import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import { userSchema } from './userSchema'
import { z } from "zod"

interface Props { hasBackButton: boolean }

function SignUpForm({ hasBackButton }: Props) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema), 
    defaultValues: {fullName: "", email: "", password: ""}
  })

  const submitHandler = (values: zod.infer<typeof userSchema>) => {
    console.log(values)
  }
  return (
    <>
    <Form {...form}>
      <form className="space-y-8">
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
        <Button onSubmit={form.handleSubmit(submitHandler)} type="submit">Registrarse</Button>
        {hasBackButton && <Button type="button" variant="outline"><a href="/">Volver</a></Button>}
      </form>
    </Form>
    </>
  )
}

export default SignUpForm