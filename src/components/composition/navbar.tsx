import { MenuIcon, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppThemeContext } from "@/context/theme";
import useCheckMounted from "@/hooks/use-check-mounted";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const themeIcon = {
  system: <SunMoonIcon />,
  light: <SunIcon />,
  dark: <MoonIcon />,
};

const NAV_LINKS = [
  { href: "/change-log", label: "Changelog", external: false },
  {
    href: "https://initiative-z.com/erazarkasih",
    label: "About",
    external: true,
  },
  {
    href: "https://github.com/rzrksh/blade",
    label: "Contribute",
    external: true,
  },
];

const Navbar = () => {
  const { isMounted } = useCheckMounted();
  const { theme, handleChangeTheme } = useAppThemeContext();

  return (
    <header className="w-full z-10 bg-background border-b fixed top-0">
      <nav className="px-4 md:px-8 lg:px-16 max-w-[var(--max-page-width)] mx-auto">
        <div className="flex h-[52px] justify-between items-center gap-4">
          <Link href="/" className="shrink-0" aria-label="Blade home">
            <Image
              src="/blade-light-mode.svg"
              width={100}
              height={17}
              alt="blade logo"
              draggable={false}
              className="dark:hidden"
            />
            <Image
              src="/blade-dark-mode.svg"
              width={100}
              height={17}
              alt="blade logo"
              draggable={false}
              className="hidden dark:block"
            />
          </Link>
          <div className="flex text-sm gap-2 md:gap-6 items-center">
            <div className="hidden md:flex gap-6 items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="inline-block hover:text-foreground/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="min-h-[36px] min-w-[66px]">
              {isMounted && (
                <Select defaultValue={theme} onValueChange={handleChangeTheme}>
                  <SelectTrigger aria-label="Theme">
                    {themeIcon[theme]}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">
                      <SunMoonIcon /> System
                    </SelectItem>
                    <SelectItem value="light">
                      <SunIcon /> Light
                    </SelectItem>
                    <SelectItem value="dark">
                      <MoonIcon /> Dark
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col px-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        className="border-b py-3 text-base last:border-b-0"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
