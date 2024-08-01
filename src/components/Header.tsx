import Logo from "../assets/logo.svg";

const Header = () => (
  <header className="flex h-20 items-center bg-secondary px-4 sm:px-20">
    <Logo data-testid="logo" />
  </header>
);

export default Header;
