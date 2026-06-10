import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppThemeContext } from "@/context/theme";
import useCheckMounted from "@/hooks/use-check-mounted";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const themeIcon = {
  system: <SunMoonIcon />,
  light: <SunIcon />,
  dark: <MoonIcon />,
};

const Navbar = () => {
  const { isMounted } = useCheckMounted();
  const { theme, handleChangeTheme } = useAppThemeContext();

  return (
    <header className="w-full z-10 bg-[var(--background))] border-b fixed top-0">
      <nav className="px-16 max-w-[var(--max-page-width)] mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/rzrblade-light-mode.svg"
              width={100}
              height={17}
              alt="rzrblade logo"
              draggable={false}
              className="dark:hidden"
            />
            <Image
              src="/rzrblade-dark-mode.svg"
              width={100}
              height={17}
              alt="rzrblade logo"
              draggable={false}
              className="hidden dark:block"
            />
          </Link>
          <div className="flex text-sm p-2 gap-6 items-center">
            <Link href="/change-log" className="inline-block">
              Changelog
            </Link>
            <Link href="/tools" className="inline-block">
              Tools
            </Link>
            <Link
              href="https://initiative-z.com/erazarkasih"
              className="inline-block"
              target="_blank"
            >
              About
            </Link>
            <Link
              href="https://github.com/rzrksh/rzrblade"
              className="inline-block"
              target="_blank"
            >
              Contribute
            </Link>
            <div className="min-h-[36px] min-w-[66px] mr-1">
              {isMounted && (
                <Select defaultValue={theme} onValueChange={handleChangeTheme}>
                  <SelectTrigger>{themeIcon[theme]}</SelectTrigger>
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
