"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ListIcon, CircleUserRoundIcon } from "lucide-react";
import TaskCard from "./dashboard/components/taskCard";
import { NavigationMenuItem, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-full flex-col items-start">
      <div className="flex flex-row justify-between w-full h-[2rem] bg-slate-50 px-4">
        <label className="font-semibold">Entrenador de Hábitos</label>
          <NavigationMenu>
            <NavigationMenuList>
              <div className="flex flex-row gap-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger><CircleUserRoundIcon /></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      <li><Button onClick={() => signOut()}>Salir</Button></li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger><ListIcon /></NavigationMenuTrigger>
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
      </div>
      <section>
        <h1 className="text-4xl font-bold mt-4">Tareas</h1>
      </section>
      <div className="flex flex-row mt-10 gap-4">
        <Card className="flex flex-col w-[300px] items-center">
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
        <TaskCard title="Ejercicios" description="Haz 30 minutos de ejercicio" status="Pendiente" points={100} />
      </div>
    </main>
  );
}
