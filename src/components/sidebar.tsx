'use client';

import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';
import dashboardImg from '@/assets/dashboard.svg';
import bookImg from '@/assets/book_4.svg';
import fileImg from '@/assets/file_copy.svg';
import questionImg from '@/assets/quiz.svg';
import dashboardWhiteImg from '@/assets/dashboard_white.svg';
import bookWhiteImg from '@/assets/book_4_white.svg';
import fileWhiteImg from '@/assets/file_copy_white.svg';
import questionWhiteImg from '@/assets/quiz_white.svg';

const sidebarItems: SidebarItems = { 
  links: [
    { label: '', href: '/', icon: dashboardImg, selectedIcon: dashboardWhiteImg },
    { label: '', href: '/item/book-page', icon: bookImg, selectedIcon: bookWhiteImg },
    { label: '', href: '/item/file-page', icon: fileImg, selectedIcon: fileWhiteImg },
    { label: '', href: '/item/question-page', icon: questionImg, selectedIcon: questionWhiteImg },
  ],
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}