import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


const Header = () => {
    return (
        <React.Fragment>
            <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <img src="/logo.jpg" alt="Logo" className="h-8" />
                </Link>
                <nav className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <img
                                    src="https://avatar.iran.liara.run/public/1"
                                    width={32}
                                    height={32}
                                    alt="Avatar"
                                    className="rounded-full"
                                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </header>
        </React.Fragment>

    );
}


export default Header;
