// MainLayout
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SideNavigation from "./SideNavigation";
import { Button } from "./ui/button";
 

interface MainLayoutProps {
  children: ReactNode
}

export default async function MainLayout({children}: MainLayoutProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if(!user){
    return redirect("/login");
  }

  return (
    <main className="flex">
      <SideNavigation />
      <section className="w-9/12">
        <header className="p-5 border-b bore">
          <div className="container flex justify-between">
            <div className="f">
              <h1>Navigation header</h1>
            </div>
            <div className="flex gap-6 justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex gap-2" variant={"outline"}><PlusIcon /> Create</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <Link href={"/admin/projects/create"}>
                    <DropdownMenuItem>
                      <span>Project</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/admin/blogs/create"}>
                    <DropdownMenuItem>
                      <span>Blog</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {user?.email && user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Billing</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Keyboard shortcuts</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>Invite users</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <span>Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <span>More...</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      <span>New Team</span>
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>GitHub</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <span>API</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="p-5 max-w-2xl m-auto">{children}</div>
      </section>
    </main>
  );

  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <Link
  //     href="/login"
  //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // );
}
