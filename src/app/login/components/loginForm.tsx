'use client';

import { RegisterUserSchema } from '@/app/types/register';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function LoginForm() {
  const form = useForm<z.infer<typeof RegisterUserSchema>>({ defaultValues: { email: '', password: '' } });
  const router = useRouter();
  const submitHandler = async (values: z.infer<typeof RegisterUserSchema>) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!response?.ok) {
      const error = response && response.error ? response.error : 'Error al iniciar sesión';
      form.setError('email', { message: error });
      return;
    }

    router.push('/');
  };

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
        <div className="space-x-4">
          <Button type="submit">Iniciar sesión</Button>
          <Button onClick={() => router.push('/signup')} type="button" variant="outline">
            Registrarse
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
