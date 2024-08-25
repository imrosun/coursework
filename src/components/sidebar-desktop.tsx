'use client';

import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '@/types';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { LogOut, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import avatarImg from "@/assets/bottom_icon.svg";
import Image from 'next/image';
import zu_icon from "@/assets/zu_icon.svg";
import zu from "@/assets/zu.svg";
import star from "@/assets/star_half.svg";
import calender from "@/assets/calender.svg";
import note from "@/assets/note_stack.svg";
import { motion } from 'framer-motion';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <div className=''>
      {/* Sidebar on the left */}
      <motion.aside
        initial={{ x: '100px' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className='w-[50px] max-w-xs h-screen fixed left-2 bottom-2 top-2 bg-white rounded-2xl z-40'
      >
        <div className='mt-2 flex flex-col justify-center items-center'>
          <Image src={zu_icon} alt="icon" width={40} height={40} />
          <div className='mt-4'>
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
            <div className='absolute bottom-3 w-full '>
              <Popover>
                <PopoverTrigger asChild className='flex justify-center'>
                  <Image src={avatarImg} alt="User Avatar" />                 
                </PopoverTrigger>
                <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                  <div className='space-y-1'>
                    <Link href='/'>
                      <SidebarButton size='sm' icon={Settings} className='w-full'>
                        Account Settings
                      </SidebarButton>
                    </Link>
                    <SidebarButton size='sm' icon={LogOut} className='w-full'>
                      Log Out
                    </SidebarButton>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Sidebar on the right */}
      <motion.div
        initial={{ x: '-100px' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className='flex flex-col fixed right-2 top-2 gap-2 items-end'
      >
        <div className='flex flex-col gap-1 items-end'>
          <div className='bg-white rounded-2xl p-1 inline-flex'>
            <Image src={zu} alt="zu" />
            <h4 className='font-bold text-[#5B6170] text-sm mr-1'>120</h4>
          </div>
          <div className='bg-white rounded-2xl p-1 inline-flex'>
            <Image src={star} alt="star" />
            <h4 className='font-bold text-[#5B6170] text-sm'>24</h4>
          </div>
        </div>
        <Image src={calender} alt="zu" />
        <Image src={note} alt="zu" />
      </motion.div>
    </div>
  );
}
