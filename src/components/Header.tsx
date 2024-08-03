import Logo from "@/assets/logo.svg";

const Header = () => (
  <header className="fixed z-10 flex h-20 w-full items-center bg-secondary px-4 sm:px-20">
    <Logo data-testid="logo" />
  </header>
);

export default Header;
