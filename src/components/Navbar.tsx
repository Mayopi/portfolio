import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/5 backdrop-blur-md border px-8 py-4 flex justify-between items-center mx-auto lg:w-2xl shadow-lg">
      <p>Navbar</p>

      <ul className="flex gap-8 text-sm items-center">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Projects</li>
        <li className="cursor-pointer">Contact</li>
        <li>
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </li>
      </ul>
    </div>
  );
}
