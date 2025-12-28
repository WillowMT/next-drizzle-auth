"use client";

import {
  ChevronDownIcon,
  LogOutIcon
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";
import { SignIn } from "@/components/signin";
import { SignUp } from "@/components/signup";

export function Profile() {
  const { data: session } = useSession();
  return (
    <>{session ? <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-auto p-0 hover:bg-transparent" variant="ghost">
            <Avatar>
              <AvatarImage alt="Profile image" src={session?.user?.image ?? `https://api.dicebear.com/9.x/glass/svg?seed=${session?.user?.name}`} />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <ChevronDownIcon
              aria-hidden="true"
              className="opacity-60"
              size={16}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64 m-2">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="truncate font-medium text-foreground text-sm">
              {session?.user?.name}
            </span>
            <span className="truncate font-normal text-muted-foreground text-xs">
              {session?.user?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon aria-hidden="true" className="opacity-60" size={16} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </> : <>
      <div className="flex items-center gap-2">
        <SignIn />
        <SignUp />
      </div>
    </>
    }
    </>
  )
}
