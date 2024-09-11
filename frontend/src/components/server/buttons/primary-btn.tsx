type Props = {
  type?: "submit" | "button";
  children?: React.ReactNode;
  onClick?: () => void;
};

export function PrimaryBtn({ type, children, onClick }: Props) {
  return (
    <button
      type={type} // Must be submit for the form wrapper in auth-btns.tsx
      onClick={onClick}
      className="rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex gap-3 items-center"
    >
      {children}
    </button>
  );
}
