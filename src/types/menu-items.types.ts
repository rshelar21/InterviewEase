import { LucideProps } from 'lucide-react';

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  isNew?: boolean;
  children?: SubMenuItem[];
}
