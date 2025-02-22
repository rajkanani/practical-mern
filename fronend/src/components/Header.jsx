import React, { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-blue-600 text-white p-4 hidden md:block">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Inventory Management</h1>

                    <nav className="flex space-x-6">
                        <a href="#" className="hover:underline">
                            Home
                        </a>
                    </nav>
                </div>
            </header>
        </>
    );
}
