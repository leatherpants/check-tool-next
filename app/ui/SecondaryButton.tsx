import clsx from 'clsx';
import { Button } from './Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SecondaryButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      className={clsx(
        `border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-white active:bg-primary-700`,
        className,
      )}
    >
      {children}
    </Button>
  );
}