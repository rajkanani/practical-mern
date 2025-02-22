import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Detail(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const _id = queryParams.get("product");

    const [inventory, setInventory] = useState([]);

    const getInventory = () => {
        axios
            .post("http://localhost:5000/products/details", {
                _id: _id,
            })
            .then((response) => {
                console.log(response.data);
                setInventory(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        getInventory();
    }, []);
    return (
        <>
            <div>Detail page</div>
            <div className="flex justify-between items-center w-full p-4">
                <div className="flex items-center">
                    <form className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                disabled
                                name="name"
                                placeholder="Enter Name"
                                value={inventory.name}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                disabled
                                name="description"
                                placeholder="Enter Description"
                                value={inventory.description}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                SKU
                            </label>
                            <input
                                type="text"
                                disabled
                                name="sku"
                                placeholder="Enter SKU"
                                value={inventory.sku}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                disabled
                                name="quantity"
                                placeholder="Enter Quantity"
                                value={inventory.quantity}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Variants
                            </label>
                            <input
                                type="text"
                                disabled
                                name="variants"
                                placeholder="Enter Variants"
                                value={inventory.variants?.join(", ")}
                                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Detail;
