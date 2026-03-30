import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-500',
        className,
      )}
    >
      {children}
    </button>
  );
}