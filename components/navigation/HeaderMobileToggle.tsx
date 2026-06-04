type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function HeaderMobileToggle({ isOpen, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-controls="navbar-menu"
      aria-expanded={isOpen}
      aria-haspopup="true"
      className="inline-flex items-center rounded-lg border border-brand-border bg-white p-2 text-brand-text transition-colors hover:border-brand-primary hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 dark:border-dark-muted/40 dark:bg-dark-surface dark:text-dark-text md:hidden"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="h-6 w-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
