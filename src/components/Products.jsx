import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Router", category: "Networking", stockLevel: 10, reorderPoint: 5 },
    { id: 2, name: "Switch", category: "Networking", stockLevel: 3, reorderPoint: 5 },
  ]);

  const [currentPage, setCurrentPage] = useState("list");
  const [editingProductId, setEditingProductId] = useState(null);

  // Products List Page View
  const ProductsPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [transactionType, setTransactionType] = useState(null);
    const [quantity, setQuantity] = useState("");

    const handleDelete = (id) => {
      // For this example, a simple filter is used.
      // A more robust app would use a custom modal for confirmation.
      setProducts(products.filter((p) => p.id !== id));
    };

    const handleTransaction = () => {
      const qty = Number(quantity);
      if (qty <= 0) {
        console.error("Quantity must be greater than 0");
        return;
      }
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                stockLevel:
                  transactionType === "in"
                    ? p.stockLevel + qty
                    : Math.max(0, p.stockLevel - qty),
              }
            : p
        )
      );
      setSelectedProduct(null);
      setTransactionType(null);
      setQuantity("");
    };

    return (
      <div className="p-5 bg-slate-800 rounded-lg shadow-xl min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-blue-400 text-3xl font-bold m-0">Products</h1>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setCurrentPage("add")}
          >
            + Add Product
          </button>
        </div>
        <table className="w-full border-collapse mt-3">
          <thead>
            <tr>
              <th className="bg-blue-800 text-white py-3 px-3 text-left rounded-t-lg">Name</th>
              <th className="bg-blue-800 text-white py-3 px-3 text-left rounded-t-lg">Category</th>
              <th className="bg-blue-800 text-white py-3 px-3 text-left rounded-t-lg">Stock</th>
              <th className="bg-blue-800 text-white py-3 px-3 text-left rounded-t-lg">Reorder Point</th>
              <th className="bg-blue-800 text-white py-3 px-3 text-left rounded-t-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No products
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-700 transition-colors duration-200 border-b border-gray-700">
                  <td className="py-3 px-3">{p.name}</td>
                  <td className="py-3 px-3">{p.category}</td>
                  <td className={`py-3 px-3 ${p.stockLevel <= p.reorderPoint ? "text-red-400 font-bold" : ""}`}>
                    {p.stockLevel}
                  </td>
                  <td className="py-3 px-3">{p.reorderPoint}</td>
                  <td className="py-3 px-3 space-x-2">
                    <button
                      className="text-blue-400 underline cursor-pointer text-sm"
                      onClick={() => {
                        setEditingProductId(p.id);
                        setCurrentPage("edit");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-red-700 text-xs"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-indigo-600 text-white p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-indigo-700 text-xs"
                      onClick={() => {
                        setSelectedProduct(p);
                        setTransactionType("in");
                      }}
                    >
                      Stock In
                    </button>
                    <button
                      className="bg-indigo-600 text-white p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-indigo-700 text-xs"
                      onClick={() => {
                        setSelectedProduct(p);
                        setTransactionType("out");
                      }}
                    >
                      Stock Out
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {selectedProduct && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-80 shadow-lg">
              <h3 className="text-blue-400 text-lg font-semibold mb-4">
                {transactionType === "in" ? "Stock In" : "Stock Out"} – {selectedProduct.name}
              </h3>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 mt-3 mb-4 rounded-md border border-gray-600 bg-slate-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between space-x-2">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200" onClick={handleTransaction}>Confirm</button>
                <button className="bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200" onClick={() => { setSelectedProduct(null); setTransactionType(null); }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Product Form View
  const ProductForm = () => {
    const isEditMode = editingProductId !== null;
    const existingProduct = isEditMode ? products.find((p) => p.id === editingProductId) : null;
  
    const [formData, setFormData] = useState(
      existingProduct || { name: "", category: "", stockLevel: 0, reorderPoint: 0 }
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isEditMode) {
        setProducts(products.map((p) => (p.id === editingProductId ? formData : p)));
      } else {
        setProducts([...products, { ...formData, id: Date.now() }]);
      }
      setCurrentPage("list");
      setEditingProductId(null);
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-800 p-6 max-w-lg mx-auto rounded-lg shadow-lg min-h-screen">
        <h2 className="text-blue-400 text-2xl font-semibold mb-2">{isEditMode ? "Edit Product" : "Add Product"}</h2>
        <label className="flex flex-col text-sm text-gray-300">
          Name:
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="p-3 mt-1 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col text-sm text-gray-300">
          Category:
          <input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="p-3 mt-1 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col text-sm text-gray-300">
          Stock Level:
          <input
            type="number"
            value={formData.stockLevel}
            onChange={(e) => setFormData({ ...formData, stockLevel: Number(e.target.value) })}
            className="p-3 mt-1 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col text-sm text-gray-300">
          Reorder Point:
          <input
            type="number"
            value={formData.reorderPoint}
            onChange={(e) => setFormData({ ...formData, reorderPoint: Number(e.target.value) })}
            className="p-3 mt-1 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-md font-semibold cursor-pointer transition-colors duration-200 hover:bg-blue-700">
            {isEditMode ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="bg-red-600 text-white p-3 rounded-md font-semibold cursor-pointer transition-colors duration-200 hover:bg-red-700"
            onClick={() => {
              setCurrentPage("list");
              setEditingProductId(null);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
  

  return (
    <div className="bg-slate-900 min-h-screen p-5 text-gray-200">
      {currentPage === "list" && <ProductsPage />}
      {currentPage === "add" && <ProductForm />}
      {currentPage === "edit" && <ProductForm />}
    </div>
  );
}