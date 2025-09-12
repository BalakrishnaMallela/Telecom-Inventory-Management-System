import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit3, Trash2, Phone, Mail, MapPin, Package, Clock, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/suppliers';

export default function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState("suppliers");
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch suppliers from the backend on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(API_URL);
        setSuppliers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch suppliers. Please check the backend connection.");
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);
  
  const categories = [...new Set(suppliers.map(s => s.category))];
  
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || supplier.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || supplier.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Suppliers Page Component
  const SuppliersPage = () => {
    const handleDelete = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSuppliers(suppliers.filter(s => s.id !== id));
      } catch (err) {
        setError("Failed to delete supplier.");
      }
    };

    if (loading) {
      return <div className="text-center text-blue-400 text-lg p-10">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-400 text-lg p-10">{error}</div>;
    }

    return (
      <div className="container mx-auto p-6 bg-slate-800 text-gray-200 rounded-lg shadow-xl min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-blue-400 text-3xl font-bold">Supplier Management</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your telecom equipment suppliers and track orders</p>
          </div>
          <button 
            className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2" 
            onClick={() => setCurrentPage('addSupplier')}
          >
            <Plus size={16} /> <span>Add Supplier</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex items-center w-full md:w-1/3">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-700 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-700 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-400 text-sm font-semibold">Total Suppliers</h3>
            <p className="text-white text-2xl font-bold mt-1">{suppliers.length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-400 text-sm font-semibold">Active Suppliers</h3>
            <p className="text-green-400 text-2xl font-bold mt-1">{suppliers.filter(s => s.status === 'Active').length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-400 text-sm font-semibold">Pending Orders</h3>
            <p className="text-yellow-400 text-2xl font-bold mt-1">{suppliers.reduce((sum, s) => sum + s.pendingOrders, 0)}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-400 text-sm font-semibold">Total Orders</h3>
            <p className="text-blue-400 text-2xl font-bold mt-1">{suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-slate-900 text-gray-400 uppercase font-semibold">
              <tr>
                <th className="p-4">Supplier Details</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Category</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="bg-slate-800 hover:bg-slate-700 transition-colors duration-200">
                  <td className="p-4">
                    <div className="text-white font-semibold">{supplier.name}</div>
                    <div className="text-gray-400 text-xs">{supplier.contactPerson}</div>
                    <div className="text-yellow-400 text-xs mt-1">★ {supplier.rating}/5</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-400 text-xs space-x-1"><Mail size={14} /> <span>{supplier.email}</span></div>
                    <div className="flex items-center text-gray-400 text-xs space-x-1 mt-1"><Phone size={14} /> <span>{supplier.phone}</span></div>
                    <div className="flex items-center text-gray-400 text-xs space-x-1 mt-1"><MapPin size={14} /> <span>{supplier.address.split(',')[0]}</span></div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-600/20 text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-full">{supplier.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{supplier.totalOrders} total</div>
                    <div className="text-yellow-400 text-xs">{supplier.pendingOrders} pending</div>
                    <div className="text-gray-500 text-xs mt-1">Last: {supplier.lastOrderDate}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${supplier.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <button className="text-green-400 hover:text-green-300 transition-colors duration-200"><Edit3 size={16} /></button>
                    <button className="text-red-400 hover:text-red-300 transition-colors duration-200" onClick={() => handleDelete(supplier.id)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Add Supplier Form Component
  const AddSupplierForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      status: 'Active',
      totalOrders: 0,
      pendingOrders: 0,
      lastOrderDate: new Date().toISOString().slice(0, 10),
      rating: 0
    });
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormError(null);
      try {
        await axios.post(API_URL, formData);
        // Re-fetch the data after a successful post to ensure UI is up-to-date
        const updatedSuppliersResponse = await axios.get(API_URL);
        setSuppliers(updatedSuppliersResponse.data);
        setCurrentPage('suppliers');
      } catch (err) {
        setFormError("Failed to add supplier. Please try again.");
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };

    return (
      <div className="container mx-auto p-6 bg-slate-800 text-gray-200 rounded-lg shadow-xl min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-blue-400 text-3xl font-bold">Add New Supplier</h1>
          <button 
            className="bg-red-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            onClick={() => setCurrentPage('suppliers')}
          >
            <X size={16} /> <span>Cancel</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-700 p-6 rounded-lg shadow-md space-y-4">
          {formError && <div className="text-red-400 text-sm text-center mb-4">{formError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-400 text-sm">Supplier Name</span>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Contact Person</span>
              <input 
                type="text" 
                name="contactPerson" 
                value={formData.contactPerson} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Email</span>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Phone</span>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Address</span>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Category</span>
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Status</span>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Rating</span>
              <input 
                type="number" 
                name="rating" 
                value={formData.rating} 
                onChange={handleChange} 
                step="0.1" 
                min="0" 
                max="5"
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Total Orders</span>
              <input 
                type="number" 
                name="totalOrders" 
                value={formData.totalOrders} 
                onChange={handleChange} 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-400 text-sm">Pending Orders</span>
              <input 
                type="number" 
                name="pendingOrders" 
                value={formData.pendingOrders} 
                onChange={handleChange} 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-slate-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 mt-4"
          >
            Add Supplier
          </button>
        </form>
      </div>
    );
  };
  
  return (
    <div className="bg-slate-900 min-h-screen p-5 text-gray-200">
      {currentPage === "suppliers" && <SuppliersPage />}
      {currentPage === "addSupplier" && <AddSupplierForm />}
    </div>
  );
}