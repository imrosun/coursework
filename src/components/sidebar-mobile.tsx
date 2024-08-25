'use client';

import { SidebarItems } from '@/types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { LogOut, Menu, MoreHorizontal, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import Image from 'next/image';
import zu_icon from "@/assets/zu_icon.svg";
import avatarImg from "@/assets/bottom_icon.svg";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex justify-between bg-white w-full pl-4 pr-3 block md:hidden'>
          <Image src={zu_icon} alt="icon" width={40} height={40} />
          <Button size='icon' variant='ghost'>
            <Menu size={20} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4 justify-center'>
        <SheetHeader className='flex flex-row space-y-0'>
          <div className='mt-5 flex flex-col justify-center items-center mb-2'>
            <Image src={zu_icon} alt="icon" width={40} height={40} />
          </div>
          {/* <SheetClose asChild>
            <Button className='h-7 w-7 p-0 right-0' variant='ghost'>
              <X size={15} />
            </Button>
          </SheetClose> */}
        </SheetHeader>
        <div className='h-full'>
          <div className='flex flex-col gap-1'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'default' : 'ghost'}
                  icon={link.icon}
                  selectedIcon={link.selectedIcon}
                  isSelected={pathname === link.href}
                  className='justify-start pr-2 pl-2 w-10 h-10 object-cover focus:fill-white'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute w-full bottom-4 px-1'>
            <Drawer>
              <DrawerTrigger asChild className='flex justify-center'>
                <Image src={avatarImg} alt="User Avatar" className='' />
              </DrawerTrigger>
              <DrawerContent className='mb-2 p-2'>
                <div className='flex flex-col space-y-2 mt-2'>
                  <Link href='/'>
                    <SidebarButton size='sm' icon={Settings} className='w-full '>
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size='sm' icon={LogOut} className='w-full'>
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}