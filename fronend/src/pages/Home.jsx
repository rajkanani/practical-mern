import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputTag from "../components/InputTag";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

function Home() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [outOfStock, setOutOfStock] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sku: "",
        quantity: "",
        variants: [],
    });

    const columns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "sku", header: "Sku" },
        { accessorKey: "quantity", header: "Quantity" },
        // { accessorKey: "variants", header: "variants" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getInventory = () => {
        axios
            .post("http://localhost:5000/products/list", {
                outOfStock: outOfStock,
            })
            .then((response) => {
                console.log(response.data, "-----------");
                setInventory(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getInventory();
    }, [outOfStock]);

    const handleSubmit = (e, typr) => {
        e.preventDefault();
        if (typr === "add") {
            console.log("Form Data:", formData);
            axios
                .post("http://localhost:5000/products/add", formData)
                .then((response) => {
                    console.log(response.data);
                    setModalIsOpen(false);
                    getInventory();
                    setFormData({});
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log("Form Data:", formData);
            axios
                .post("http://localhost:5000/products/update", formData)
                .then((response) => {
                    console.log(response.data);
                    setModalIsOpen(false);
                    getInventory();
                    setFormData({});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const onTagChange = (tagList) => {
        setFormData({ ...formData, variants: tagList });
    };

    return (
        <>
            <div className="flex justify-between items-center w-full p-4">
                <div>
                    <label className="form-check-label mr-3">
                        Show out of stock products
                    </label>
                    <input
                        type="checkbox"
                        id="outOfStock"
                        name="outOfStock"
                        checked={outOfStock}
                        onChange={() => setOutOfStock(!outOfStock)}
                    />
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md"
                    onClick={() => {
                        setModalIsOpen(true);
                        setIsEdit(false);
                    }}
                >
                    Create Product
                </button>
            </div>
            <div className="flex justify-center bg-gray-50 h-full">
                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                {columns.length &&
                                    columns.map((val, i) => {
                                        return (
                                            <th
                                                key={i}
                                                className="border border-gray-300 px-4 py-2"
                                            >
                                                {val.header}
                                            </th>
                                        );
                                    })}
                                <th className="border border-gray-300 px-4 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((val, i) => {
                                return (
                                    <tr key={i}>
                                        {columns.map((val2, j) => {
                                            return (
                                                <td
                                                    key={j}
                                                    className="border border-gray-300 px-4 py-2"
                                                >
                                                    {val[val2.accessorKey]}
                                                </td>
                                            );
                                        })}
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="mr-3"
                                                onClick={() => {
                                                    setModalIsOpen(true);
                                                    setIsEdit(true);
                                                    setFormData(val);
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="M12 20h9" />
                                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/product-detail?product=" +
                                                            val._id
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="3"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                    setFormData({});
                }}
            >
                <h2 className="text-xl font-bold">
                    {isEdit ? "Edit" : "Create"} Product
                </h2>
                <form
                    className="mt-4 space-y-4"
                    onSubmit={(e) => handleSubmit(e, isEdit ? "edit" : "add")}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            required
                            name="description"
                            placeholder="Enter Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            SKU
                        </label>
                        <input
                            type="text"
                            required
                            name="sku"
                            placeholder="Enter SKU"
                            value={formData.sku}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            type="number"
                            required
                            name="quantity"
                            placeholder="Enter Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Variants
                        </label>
                        <InputTag
                            tagsProps={formData.variants || []}
                            tagsLengthProps={5}
                            onTagChange={onTagChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        {isEdit ? "Update" : "Create"}
                    </button>
                </form>
            </Modal>
        </>
    );
}

export default Home;
