import clsx from 'clsx';
import { Button } from './Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function DangerButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      className={clsx(
        `border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-700`,
        className,
      )}
    >
      {children}
    </Button>
  );
}