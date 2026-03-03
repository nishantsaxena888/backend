import { useState, useRef } from 'react';
import { X, Download, Printer, Mail, Share2 } from 'lucide-react';
import { Order, Customer } from './DataModels';

interface InvoiceGeneratorProps {
  order: Order;
  customer: Customer;
  onClose: () => void;
}

export function InvoiceGenerator({ order, customer, onClose }: InvoiceGeneratorProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    alert('PDF download would be triggered here. In production, integrate with jsPDF or a PDF API.');
  };

  const handleEmail = () => {
    alert(`Email invoice to ${customer.email}. In production, integrate with email service.`);
  };

  // Company/Warehouse Information
  const warehouseInfo = {
    name: 'Premium Warehouse & Logistics',
    address: '1000 Industrial Parkway',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'USA',
    phone: '+1 (555) 123-4567',
    email: 'billing@premiumwarehouse.com',
    website: 'www.premiumwarehouse.com',
    taxId: 'TAX-123456789',
    logo: '🏢', // In production, use actual logo image
  };

  const invoiceNumber = `INV-${order.orderNumber.split('-').pop()}`;
  const invoiceDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const dueDate = order.dueDate 
    ? new Date(order.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Upon Receipt';

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-print-area,
          #invoice-print-area * {
            visibility: visible;
          }
          #invoice-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-after: always;
          }
        }
        
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 no-print">
        <div className="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
          {/* Header Actions */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 no-print">
            <h3 className="text-xl">Invoice Preview</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEmail}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div id="invoice-print-area" ref={printRef} className="bg-white">
            <div className="p-12">
              {/* Header with Logo and Company Info */}
              <div className="flex justify-between items-start mb-8 pb-8 border-b-2 border-gray-900">
                <div>
                  <div className="text-6xl mb-2">{warehouseInfo.logo}</div>
                  <h1 className="text-3xl mb-2">{warehouseInfo.name}</h1>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>{warehouseInfo.address}</p>
                    <p>{warehouseInfo.city}, {warehouseInfo.state} {warehouseInfo.zipCode}</p>
                    <p>{warehouseInfo.country}</p>
                    <p className="mt-2">Phone: {warehouseInfo.phone}</p>
                    <p>Email: {warehouseInfo.email}</p>
                    <p>Website: {warehouseInfo.website}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl mb-4">INVOICE</h2>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="text-gray-600">Invoice #:</div>
                      <div>{invoiceNumber}</div>
                      <div className="text-gray-600">Order #:</div>
                      <div>{order.orderNumber}</div>
                      <div className="text-gray-600">Invoice Date:</div>
                      <div>{invoiceDate}</div>
                      <div className="text-gray-600">Due Date:</div>
                      <div>{dueDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill To / Ship To Section */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-3 pb-2 border-b border-gray-300">Bill To</h3>
                  <div className="space-y-1">
                    <p>{customer.name}</p>
                    {customer.company && <p className="text-sm text-gray-600">{customer.company}</p>}
                    <p className="text-sm">{order.billingAddress}</p>
                    <p className="text-sm mt-2">Email: {customer.email}</p>
                    <p className="text-sm">Phone: {customer.phone}</p>
                    {customer.type && (
                      <p className="text-sm mt-2">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {customer.type} Customer
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-3 pb-2 border-b border-gray-300">Ship To</h3>
                  <div className="space-y-1">
                    <p>{customer.name}</p>
                    <p className="text-sm">{order.shippingAddress}</p>
                    <p className="text-sm mt-2">Shipping Method: {order.shippingMethod}</p>
                    <p className="text-sm">
                      Order Status: 
                      <span className={`ml-2 inline-block px-2 py-1 rounded text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">Item</th>
                      <th className="px-4 py-3 text-left text-sm uppercase tracking-wider">SKU</th>
                      <th className="px-4 py-3 text-center text-sm uppercase tracking-wider">Qty</th>
                      <th className="px-4 py-3 text-right text-sm uppercase tracking-wider">Unit Price</th>
                      <th className="px-4 py-3 text-right text-sm uppercase tracking-wider">Discount</th>
                      <th className="px-4 py-3 text-right text-sm uppercase tracking-wider">Tax</th>
                      <th className="px-4 py-3 text-right text-sm uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <td className="px-4 py-3">
                          <div>{item.productName}</div>
                          <div className="text-xs text-gray-500 mt-1">Product ID: {item.productId}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.sku}</td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-red-600">
                          {item.discount > 0 ? `-$${item.discount.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-right">${item.tax.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Section */}
              <div className="flex justify-end mb-8">
                <div className="w-80">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between py-2 text-red-600">
                        <span>Discount:</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Tax:</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Shipping & Handling:</span>
                      <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-t-2 border-gray-900 text-xl">
                      <span>Total Amount:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-yellow-50 px-3 rounded">
                      <span>Payment Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        order.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                        order.paymentStatus === 'Unpaid' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    {order.paymentStatus === 'Unpaid' && (
                      <div className="flex justify-between py-2 bg-red-50 px-3 rounded">
                        <span>Amount Due:</span>
                        <span className="text-red-600">${order.total.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-sm uppercase tracking-wider mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-2">Payment Methods Accepted:</p>
                    <ul className="space-y-1">
                      <li>• Bank Transfer / Wire</li>
                      <li>• Credit Card (Visa, MasterCard, Amex)</li>
                      <li>• PayPal</li>
                      <li>• Check (For approved customers)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Bank Details:</p>
                    <ul className="space-y-1">
                      <li>Bank Name: Premium Bank USA</li>
                      <li>Account #: 1234567890</li>
                      <li>Routing #: 987654321</li>
                      <li>SWIFT: PREMUSA33</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Notes and Terms */}
              <div className="mb-8">
                {order.notes && (
                  <div className="mb-4">
                    <h3 className="text-sm uppercase tracking-wider mb-2">Notes</h3>
                    <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">{order.notes}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-2">Terms & Conditions</h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>1. Payment is due within 30 days of invoice date unless otherwise agreed.</p>
                    <p>2. Late payments may incur a 1.5% monthly interest charge.</p>
                    <p>3. All goods remain the property of {warehouseInfo.name} until payment is received in full.</p>
                    <p>4. Returns must be authorized and made within 14 days of delivery in original condition.</p>
                    <p>5. Shipping and handling charges are non-refundable.</p>
                    <p>6. Disputes must be reported within 7 days of invoice date.</p>
                    <p>7. This invoice is subject to the terms and conditions available at {warehouseInfo.website}/terms</p>
                  </div>
                </div>
              </div>

              {/* Footer with Barcode/Reference */}
              <div className="border-t-2 border-gray-900 pt-6">
                <div className="flex justify-between items-end">
                  <div className="text-xs text-gray-500">
                    <p>Tax ID: {warehouseInfo.taxId}</p>
                    <p className="mt-1">Generated: {new Date().toLocaleString()}</p>
                    <p className="mt-3">Questions? Contact us at {warehouseInfo.email} or {warehouseInfo.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-gray-900 text-white px-6 py-3 font-mono text-lg tracking-wider rounded">
                      {invoiceNumber}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Scan or reference this code for tracking</p>
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-300">
                <div>
                  <p className="text-sm text-gray-600 mb-8">Authorized Signature:</p>
                  <div className="border-b border-gray-400 w-64"></div>
                  <p className="text-xs text-gray-500 mt-2">Warehouse Manager</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-8">Customer Signature:</p>
                  <div className="border-b border-gray-400 w-64"></div>
                  <p className="text-xs text-gray-500 mt-2">Date: _______________</p>
                </div>
              </div>

              {/* Page Footer - shown on print */}
              <div className="mt-12 text-center text-xs text-gray-400">
                <p>This is a computer-generated invoice and is valid without signature.</p>
                <p className="mt-1">{warehouseInfo.name} | {warehouseInfo.address}, {warehouseInfo.city}, {warehouseInfo.state} {warehouseInfo.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
