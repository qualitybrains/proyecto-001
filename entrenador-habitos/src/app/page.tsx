"use client"
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ListIcon, CircleUserRoundIcon, SquarePlusIcon, PlusIcon } from "lucide-react";
import TaskCard from "./dashboard/components/taskCard";
import { NavigationMenuItem, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-full flex-col items-start px-4">
      <div className="flex flex-row justify-between w-full h-[2rem] bg-slate-50">
        <label className="font-semibold">Entrenador de Hábitos</label>
          <NavigationMenu>
            <NavigationMenuList>
              <div className="flex flex-row gap-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger><CircleUserRoundIcon /></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      <li><Button onClick={() => signOut()} variant={"link"}>Salir</Button></li>
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
      <section className="flex flex-row gap-4 align-middle mt-6 px-4">
        <h1 className="text-4xl font-bold">Tareas</h1>
        <Button className="w-10 h-10"><PlusIcon /></Button>
      </section>
      <div className="flex flex-row mt-10 gap-4">
        <TaskCard title="Lectura" description="Lee al menos 10 páginas de un libro" status="Pendiente" points={75} />
        <TaskCard title="Ejercicios" description="Haz 30 minutos de ejercicio" status="Pendiente" points={100} />
      </div>
    </main>
  );
}
