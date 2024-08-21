import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { FC, SVGProps } from 'react';
import { StaticImageData } from 'next/image'; 
import { LucideIcon } from 'lucide-react';
import { SheetClose } from './ui/sheet';

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon | FC<SVGProps<SVGSVGElement>> | StaticImageData;
  className?: string;
  variant?: 'default' | 'ghost' | 'secondary';
  children: React.ReactNode;
}

export function SidebarButton({
  icon,
  className,
  children,
  ...props
}: SidebarButtonProps) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      // If icon is a string, treat it as a URL and render an <img> element
      return <img src={icon} alt="icon"  width={40} height={40}/>;
    } else if (icon && 'src' in icon) {
      // If icon is a StaticImageData object, render an <img> element
      return <img src={(icon as StaticImageData).src} alt="icon" width={40} height={40} />;
    } else if (icon) {
      // If icon is an SVG component, render it as a React component
      const IconComponent = icon;
      return <IconComponent  width={40} height={40} className="" />;
    }
    return null;
  };

  return (
    <Button
      variant={props.variant}
      className={cn('flex items-center justify-center', className)} // Ensure alignment with flexbox
      {...props}
    >
      {renderIcon()}
      <span className="text-center">{children}</span>
    </Button>
  );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
