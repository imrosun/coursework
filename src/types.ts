import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { ReactNode, FC, SVGProps, ImgHTMLAttributes } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon | FC<SVGProps<SVGSVGElement>> | StaticImageData; 
  }>;
  extras?: ReactNode;
}

// Line 11: package.json for pdf reader
// "type": "module",
