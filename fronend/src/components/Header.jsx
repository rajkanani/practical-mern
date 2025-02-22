import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header className="bg-blue-600 text-white p-4 hidden md:block">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Inventory Management</h1>

                    <nav className="flex space-x-6">
                        <Link to={"/"} className="hover:underline">
                            Home
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
