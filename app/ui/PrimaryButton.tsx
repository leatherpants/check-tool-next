import clsx from 'clsx';
import { Button } from './Button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      className={clsx(
        `border-primary-500 text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700`,
        className,
      )}
    >
      {children}
    </Button>
  );
}