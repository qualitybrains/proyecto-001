import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { CircleUserRoundIcon, ListIcon, PlusIcon, SquarePlusIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

function TopNavBar() {
  return (
    <div className="flex h-[2rem] w-full flex-row justify-between bg-slate-50">
      <label className="font-semibold">Entrenador de Hábitos</label>
      <NavigationMenu>
        <NavigationMenuList>
          <div className="flex flex-row gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <CircleUserRoundIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <li>
                    <Button onClick={async () => await signOut({ callbackUrl: '/login' })} variant={'link'}>
                      Salir
                    </Button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <ListIcon />
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default TopNavBar;
