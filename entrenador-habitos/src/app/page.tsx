"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-full flex-col items-center p-24">
        <section>
          <h1 className="text-5xl font-bold">Entrenador Hábitos - Quality Brains</h1>
        </section>
        <div className="mt-10">
        <Card className="flex flex-col w-[400px] items-center">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <label>Aqui vamos a tener el tablero con las tareas</label>
          </CardContent>
          <CardFooter className="gap-x-5">
            <Button><a href="/login">Cerrar sesión</a></Button>
          </CardFooter>
        </Card>
        </div>
    </main>
  );
}
