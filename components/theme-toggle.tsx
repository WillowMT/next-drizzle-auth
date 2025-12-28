"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="m-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Select theme" size="icon" variant="outline">
            {theme === "light" && (
              <SunIcon aria-hidden="true" size={16} />
            )}
            {theme === "dark" && (
              <MoonIcon aria-hidden="true" size={16} />
            )}
            {theme === "system" && (
              <MonitorIcon aria-hidden="true" size={16} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
