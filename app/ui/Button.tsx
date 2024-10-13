import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `flex justify-center items-center rounded-xl px-4 py-2 h-fit border-2
         aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
        className,
      )}
    >
      {children}
    </button>
  );
}