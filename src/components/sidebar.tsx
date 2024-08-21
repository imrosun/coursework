'use client';

import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';
import dashboardImg from '@/assets/dashboard.svg';
import bookImg from '@/assets/book_4.svg';
import fileImg from '@/assets/file_copy.svg';
import questionImg from '@/assets/quiz.svg';

const sidebarItems: SidebarItems = { 
  links: [
    { label: '', href: '/', icon: dashboardImg },
    { label: '', href: '/item/book-page', icon: bookImg },
    { label: '', href: '/item/file-page', icon: fileImg },
    { href: '/item/question-page', icon: questionImg, label: '' },
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