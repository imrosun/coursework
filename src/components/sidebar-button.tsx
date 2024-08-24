import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { FC, SVGProps } from 'react';
import { StaticImageData } from 'next/image'; 
import { LucideIcon } from 'lucide-react';
import { SheetClose } from './ui/sheet';

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon | FC<SVGProps<SVGSVGElement>> | StaticImageData;
  selectedIcon?: LucideIcon | FC<SVGProps<SVGSVGElement>> | StaticImageData;
  className?: string;
  variant?: 'default' | 'ghost' | 'secondary';
  children: React.ReactNode;
  isSelected?: boolean;
}

export function SidebarButton({
  icon,
  selectedIcon,
  className,
  children,
  isSelected = false,
  ...props
}: SidebarButtonProps) {
  const renderIcon = () => {
    const currentIcon = isSelected && selectedIcon ? selectedIcon : icon;
    
    if (typeof currentIcon === 'string') {
      return <img src={currentIcon} alt="icon" width={40} height={40} />;
    } else if (currentIcon && 'src' in currentIcon) {
      return <img src={(currentIcon as StaticImageData).src} alt="icon" width={40} height={40} />;
    } else if (currentIcon) {
      const IconComponent = currentIcon;
      return <IconComponent width={40} height={40} className="" />;
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
