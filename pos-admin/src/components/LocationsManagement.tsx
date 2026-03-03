import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, MapPin, Package, TrendingUp, Warehouse } from 'lucide-react';
import { Location } from './DataModels';

const mockLocations: Location[] = [
  { id: 1, name: 'Main Warehouse - West', code: 'WH-001', type: 'Warehouse', address: '1000 Industrial Pkwy', city: 'Los Angeles', state: 'CA', country: 'USA', capacity: 50000, currentUtilization: 78, manager: 'John Smith', phone: '555-2001', status: 'Active', createdAt: '2022-01-10', products: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 2, name: 'Distribution Center - East', code: 'DC-001', type: 'Distribution Center', address: '2000 Commerce Blvd', city: 'New York', state: 'NY', country: 'USA', capacity: 75000, currentUtilization: 65, manager: 'Sarah Johnson', phone: '555-2002', status: 'Active', createdAt: '2022-03-15', products: [1, 2, 9, 10, 11, 12, 13] },
  { id: 3, name: 'Retail Store - Downtown', code: 'ST-001', type: 'Store', address: '3000 Main Street', city: 'Chicago', state: 'IL', country: 'USA', capacity: 5000, currentUtilization: 85, manager: 'Mike Davis', phone: '555-2003', status: 'Active', createdAt: '2022-06-20', products: [1, 2, 3, 9, 10, 14, 15] },
  { id: 4, name: 'Warehouse - South', code: 'WH-002', type: 'Warehouse', address: '4000 Logistics Ave', city: 'Dallas', state: 'TX', country: 'USA', capacity: 60000, currentUtilization: 45, manager: 'Lisa Brown', phone: '555-2004', status: 'Active', createdAt: '2023-02-14', products: [4, 5, 6, 16, 17, 18] },
  { id: 5, name: 'Distribution Center - Central', code: 'DC-002', type: 'Distribution Center', address: '5000 Highway 50', city: 'Kansas City', state: 'MO', country: 'USA', capacity: 80000, currentUtilization: 55, manager: 'Tom Wilson', phone: '555-2005', status: 'Active', createdAt: '2023-05-10', products: [7, 8, 9, 19, 20, 21] },
  { id: 6, name: 'Retail Store - Mall Location', code: 'ST-002', type: 'Store', address: '6000 Shopping Center Dr', city: 'Miami', state: 'FL', country: 'USA', capacity: 3000, currentUtilization: 92, manager: 'Emma Garcia', phone: '555-2006', status: 'Active', createdAt: '2023-08-22', products: [1, 2, 3, 10, 11, 22] },
  { id: 7, name: 'Warehouse - Northwest', code: 'WH-003', type: 'Warehouse', address: '7000 Port Access Rd', city: 'Seattle', state: 'WA', country: 'USA', capacity: 55000, currentUtilization: 38, manager: 'Chris Martinez', phone: '555-2007', status: 'Active', createdAt: '2023-11-05', products: [12, 13, 14, 15, 16] },
  { id: 8, name: 'Old Warehouse - Closed', code: 'WH-OLD', type: 'Warehouse', address: '8000 Legacy Ln', city: 'Detroit', state: 'MI', country: 'USA', capacity: 40000, currentUtilization: 15, manager: 'N/A', phone: '555-2008', status: 'Maintenance', createdAt: '2020-05-12', products: [] },
];

export function LocationsManagement() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const types = ['Warehouse', 'Store', 'Distribution Center'];
  const statuses = ['Active', 'Inactive', 'Maintenance'];

  // Filter locations
  const filteredLocations = locations.filter(location => {
    const matchesSearch = !searchTerm || 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter.length === 0 || typeFilter.includes(location.type);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(location.status);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Warehouse':
        return 'bg-blue-100 text-blue-800';
      case 'Store':
        return 'bg-green-100 text-green-800';
      case 'Distribution Center':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleViewDetails = (location: Location) => {
    setSelectedLocation(location);
    setShowDetails(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  const totalLocations = filteredLocations.length;
  const activeLocations = filteredLocations.filter(l => l.status === 'Active').length;
  const totalCapacity = filteredLocations.reduce((sum, l) => sum + l.capacity, 0);
  const avgUtilization = totalLocations > 0 
    ? filteredLocations.reduce((sum, l) => sum + l.currentUtilization, 0) / totalLocations 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Locations Management</h2>
          <p className="text-gray-600 mt-2">Manage warehouses, stores, and distribution centers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Location
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Locations</p>
              <p className="text-2xl mt-1">{totalLocations}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Locations</p>
              <p className="text-2xl mt-1">{activeLocations}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Capacity</p>
              <p className="text-2xl mt-1">{totalCapacity.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Warehouse className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Utilization</p>
              <p className="text-2xl mt-1">{avgUtilization.toFixed(0)}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, code, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-2">Location Type</label>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    if (typeFilter.includes(type)) {
                      setTypeFilter(typeFilter.filter(t => t !== type));
                    } else {
                      setTypeFilter([...typeFilter, type]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    typeFilter.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    if (statusFilter.includes(status)) {
                      setStatusFilter(statusFilter.filter(s => s !== status));
                    } else {
                      setStatusFilter([...statusFilter, status]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    statusFilter.includes(status)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">City/State</th>
                <th className="px-4 py-3 text-left">Manager</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Capacity</th>
                <th className="px-4 py-3 text-right">Utilization</th>
                <th className="px-4 py-3 text-right">Products</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((location) => (
                <tr key={location.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div>{location.name}</div>
                      <div className="text-xs text-gray-500">{location.code}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(location.type)}`}>
                      {location.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {location.city}, {location.state}
                  </td>
                  <td className="px-4 py-3">{location.manager}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(location.status)}`}>
                      {location.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{location.capacity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={getUtilizationColor(location.currentUtilization)}>
                      {location.currentUtilization}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{location.products.length}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(location)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit location"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete location"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Details Modal */}
      {showDetails && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl">{selectedLocation.name}</h3>
                <p className="text-gray-600 mt-1">{selectedLocation.code}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getTypeColor(selectedLocation.type)}`}>
                    {selectedLocation.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedLocation.status)}`}>
                    {selectedLocation.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Manager</p>
                  <p>{selectedLocation.manager}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p>{selectedLocation.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p>{selectedLocation.address}</p>
                <p>{selectedLocation.city}, {selectedLocation.state}</p>
                <p>{selectedLocation.country}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="text-xl">{selectedLocation.capacity.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Utilization</p>
                  <p className={`text-xl ${getUtilizationColor(selectedLocation.currentUtilization)}`}>
                    {selectedLocation.currentUtilization}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products Stored</p>
                  <p className="text-xl">{selectedLocation.products.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p>{selectedLocation.createdAt}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Utilization Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      selectedLocation.currentUtilization >= 90
                        ? 'bg-red-600'
                        : selectedLocation.currentUtilization >= 75
                        ? 'bg-yellow-600'
                        : 'bg-green-600'
                    }`}
                    style={{ width: `${selectedLocation.currentUtilization}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">Relationships: Many-to-Many</p>
                <p className="text-xs text-gray-600 mt-1">
                  This location stores {selectedLocation.products.length} products. Products can be stored in multiple locations, and locations can store multiple products.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetails(false)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
