'use client';

import { RegisterUserSchema } from '@/app/types/register';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });

  const { toast } = useToast();

  const submitHandler = async (values: z.infer<typeof RegisterUserSchema>) => {
    try {
      // TODO: should have their own file to handle API calls
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        if (response.status === 400) form.setError('email', { message: 'Email ya registrado' });
        throw new Error('Error al registrar usuario');
      }

      router.push('/login');
    } catch (error) {
      // TODO: Should handle error message in the API
      toast({
        description: 'Error al registrar usuario',
        variant: 'destructive',
      });
    }
  };
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4">
          <Button type="submit">Registrarse</Button>
          <Button onClick={() => router.push('/login')} type="button" variant="outline">
            Volver
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
