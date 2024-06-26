"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  const alerta = () => alert("Hola QB!")
  return (
    <main className="flex min-h-screen max-w-full flex-col items-center p-24">
        <section>
          <h1 className="text-5xl font-bold">Entrenador Hábitos - Quality Brains</h1>
        </section>
        <div className="mt-10">
        <Card className="flex flex-col w-[400px] items-center">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Input placeholder="Email"></Input>
              <Input placeholder="Password"></Input>
            </div>
          </CardContent>
          <CardFooter className="gap-x-5">
            <Button onClick={alerta}>Login</Button> <Button variant="outline">Registrarse</Button>
          </CardFooter>
        </Card>
        </div>
    </main>
  );
}
