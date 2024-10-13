import clsx from 'clsx';
import { Button } from './Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function TertiaryButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      className={clsx(
        `border-gray-500 text-gray-500 hover:bg-gray-400 hover:text-white active:bg-gray-500`,
        className,
      )}
    >
      {children}
    </Button>
  );
}