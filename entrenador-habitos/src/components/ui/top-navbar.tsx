import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ListIcon, CircleUserRoundIcon, SquarePlusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function TopNavBar() {
  return (
    <div className="flex flex-row justify-between w-full h-[2rem] bg-slate-50">
        <label className="font-semibold">Entrenador de Hábitos</label>
          <NavigationMenu>
            <NavigationMenuList>
              <div className="flex flex-row gap-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger><CircleUserRoundIcon /></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      <li><Button onClick={ async () => await signOut({ callbackUrl: "/login"})} variant={"link"}>Salir</Button></li>
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
  )
}

export default TopNavBar