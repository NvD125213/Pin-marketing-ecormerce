import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  XMarkIcon,
  Bars3Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";

const NAV_MENU = [
  {
    name: "Giới thiệu",
    icon: RectangleStackIcon,
    href: "/about-us",
  },
  {
    name: "Kiểm tra mã pin",
    icon: ViewfinderCircleIcon,
    href: "/check-pin",
  },
  {
    name: "Liên hệ",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    href: "https://www.material-tailwind.com/docs/react/installation",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href = "#" }: NavItemProps) {
  const isExternal = href.startsWith("http");

  const commonClass =
    "flex items-center gap-2 font-medium text-gray-900 hover:text-blue-600 transition-colors";

  if (isExternal) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClass}>
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={commonClass}>
        {children}
      </Link>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setOpen(false);
    });
  }, []);

  return (
    <div className="px-10 sticky top-4 z-50">
      <div className="mx-auto container">
        {/* @ts-ignore */}
        <MTNavbar
          placeholder=""
          blurred
          color="white"
          className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logos/PinLogo.png"
                alt="Pin logo"
                width={64}
                height={64}
              />
            </Link>
            <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href}>
                  <Icon className="h-5 w-5" />
                  {name}
                </NavItem>
              ))}
            </ul>
            <div className="hidden items-center lg:flex">
              {/* @ts-ignore */}
              <Button placeholder="" variant="text" color="blue">
                Đăng nhập
              </Button>
            </div>
            {/* @ts-ignore */}
            <IconButton
              placeholder=""
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden">
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>

          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;
