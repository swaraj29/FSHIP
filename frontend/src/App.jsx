import React, { useState } from "react";
import axios from "axios";
import image from "./assets/image.png"; // Import the image
import image2 from "./assets/image2.png"; // Import the second image
import image3 from "./assets/image3.png"; // Import the third image

function App() {
  const [waybill, setWaybill] = useState("");
  const [shippingLabel, setShippingLabel] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!waybill.trim()) {
      setError("Please enter a valid waybill number.");
      return;
    }

    setLoading(true);
    setError("");
    setShippingLabel(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/shipping-label",
        { waybill }
      );

      // Log the backend response for debugging
      console.log("Backend Response:", response.data);

      // Check if the response contains the expected data
      if (!response.data || !response.data.resultDetails || !response.data.resultDetails[waybill]) {
        throw new Error("Invalid response from the server.");
      }

      const backendData = response.data.resultDetails[waybill];

      // Log the backendData to check its structure
      console.log("Backend Data:", backendData);

      // Ensure the products array exists
      if (!backendData.Products || !Array.isArray(backendData.Products)) {
        console.warn("Products data is missing or invalid. Using an empty array as fallback.");
        backendData.Products = []; // Fallback to an empty array
      }

      // Calculate dimensions and weight
      const dimensions = `${backendData.shipment_Length || "N/A"}*${backendData.shipment_Width || "N/A"}*${backendData.shipment_Height || "N/A"} (cm)`;
      const weight = `${backendData.ShipmentWt || "N/A"} kg`;

      // Map backend response to shippingLabel state
      setShippingLabel({
        ShipTo: {
          Name: backendData.ConsigneeDetails?.CustomerName || "N/A", // Fallback if missing
          Address: {
            Line1: backendData.ConsigneeDetails?.CustomerAddress1 || "N/A", // Fallback if missing
            Line2: backendData.ConsigneeDetails?.CustomerAddress2 || "N/A", // Fallback if missing
            City: backendData.ConsigneeDetails?.City || "N/A", // Fallback if missing
            State: backendData.ConsigneeDetails?.State || "N/A", // Fallback if missing
            ZipCode: backendData.ConsigneeDetails?.Pincode || "N/A", // Fallback if missing
          },
          Phone: backendData.ConsigneeDetails?.CustomerContact || "N/A", // Fallback if missing
        },
        ReturnTo: {
          Address: backendData.ReturnTo?.ReturnAddress || "N/A",
          City: backendData.ReturnTo?.City || "N/A",
          State: backendData.ReturnTo?.State || "N/A",
          Pincode: backendData.ReturnTo?.Pincode || "N/A",
          Contact: backendData.ReturnTo?.ReturnContact || "N/A"
        },
        
        SecuredShipmentCode: "LF9358", // Static for now
        Dimensions: dimensions, // Use calculated dimensions
        Weight: weight, // Use calculated weight
        PaymentStatus: backendData.PaymentMode === "COD" ? "COD" : "PREPAID",
        AWBNumber: backendData.AWBNumber || "N/A", // Fallback if missing
        RoutingCode: backendData.RoutingCode || "N/A", // Fallback if missing
        OrderId: backendData.OrderId || "N/A", // Fallback if missing
        InvoiceDate: new Date().toLocaleDateString(), // Use current date or fetch from backend
        Products: backendData.Products.map((product) => {
          // Calculate CGST, SGST, and Total
          const productValue = parseFloat(product.ProductValue) || 0;
          const productQty = parseInt(product.ProductQty) || 0;
          const taxRate = parseFloat(product.taxRate) || 0; // Assuming taxRate is provided as a percentage

          const taxableValue = productValue * productQty;
          const cgst = (taxableValue * taxRate) / 100 / 2; // CGST is half of the total tax
          const sgst = (taxableValue * taxRate) / 100 / 2; // SGST is half of the total tax
          const total = taxableValue + cgst + sgst;

          return {
            ProductName: product.ProductName || "N/A", // Fallback if missing
            HSNCode: product.HSNCode || "N/A", // Fallback if missing
            ProductQty: productQty,
            ProductValue: productValue,
            CGST: cgst.toFixed(2), // Round to 2 decimal places
            SGST: sgst.toFixed(2), // Round to 2 decimal places
            Total: total.toFixed(2), // Round to 2 decimal places
          };
        }),
      });
    } catch (err) {
      console.error("Error:", err); // Log the error
      setError(
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch shipping label. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-3xl font-bold mb-4">
        Shipping Label Generator
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mb-4">
          <label
            htmlFor="waybill"
            className="block text-sm font-medium text-gray-700"
          >
            Waybill Number
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="waybill"
            value={waybill}
            onChange={(e) => setWaybill(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Label"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {shippingLabel && (
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg border-2 border-black">
          {/* Header Section */}
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
            {/* Left Section: SHIP TO */}
            <div className="w-2/3">
              <h2 className="text-lg font-bold mb-2">SHIP TO</h2>
              <p className="text-lg font-bold">
                {shippingLabel.ShipTo.Name}
                <br />
                {shippingLabel.ShipTo.Address.Line1}
                <br />
                {shippingLabel.ShipTo.Address.Line2}
                <br />
                {shippingLabel.ShipTo.Address.City}, {shippingLabel.ShipTo.Address.State}
                <br />
                {shippingLabel.ShipTo.Address.ZipCode}
                <br />
                Mo: {shippingLabel.ShipTo.Phone}
              </p>
            </div>

            {/* Right Section: SECURED SHIPMENT and Logo */}
            <div className="w-1/3 flex flex-col items-end">
              <h1 className="text-xl font-bold mb-4">
                SECURED SHIPMENT - {shippingLabel.SecuredShipmentCode}
              </h1>
              <img src={image} alt="Lôrith France Logo" className="h-32" />
            </div>
          </div>

          {/* Shipping Information and Barcode Section */}
          <div className="flex justify-between border-b-2 border-black pb-4 mb-4">
            {/* Left Section: Shipping Information */}
            <div className="w-2/3">
              <p className="text-sm">
                <strong>Dimensions:</strong> {shippingLabel.Dimensions}
              </p>
              <p className="text-sm">
                <strong>Weight:</strong> {shippingLabel.Weight}
              </p>
              <p className="text-sm">
                Payment: <strong>{shippingLabel.PaymentStatus}</strong>
              </p>
              <strong className="mt-8 ml-7 text-3xl block">
                {shippingLabel.PaymentStatus}
              </strong>
            </div>

            {/* Right Section: Barcode Section */}
            <div className="w-1/3 flex flex-col items-end">
              <img src={image2} alt="Barcode" className="h-28 mb-2" />
              <p className="text-sm">
                <strong>Awb:</strong> {shippingLabel.AWBNumber}
              </p>
              <p className="text-sm">
                <strong>Routing Code:</strong> {shippingLabel.RoutingCode}
              </p>
            </div>
          </div>

          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-lg font-bold mb-2">
              SHIPPED BY{" "}
              <span className="text-lg font-normal">(if undelivered, return to)</span>
            </h2>
            <div className="flex justify-between">
              <div className="w-2/3">
                <p className="text-lg">
                  <strong className="text-lg">Lorith France</strong>
                  <br />
                  {shippingLabel.ReturnTo.Address}
                  <br />
                  {shippingLabel.ReturnTo.City}, {shippingLabel.ReturnTo.State}
                  <br />
                  {shippingLabel.ReturnTo.Pincode}
                  <br />
                  Support No: {shippingLabel.ReturnTo.Contact}
                  <br />
                  Support Email: care@lorithfrance.com
                </p>
              </div>

              {/* Right Section: Order ID, Image, and Invoice Date */}
              <div className="w-1/3 flex flex-col items-end">
                <p className="text-sm">
                  <strong>Order ID:</strong> {shippingLabel.OrderId}
                </p>
                <img src={image3} alt="Lôrith France Logo" className="h-32 my-2" />
                <p className="text-sm">
                  <strong>Invoice Date:</strong> {shippingLabel.InvoiceDate}
                </p>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-black px-4 py-2 text-left">
                  Product Description & SKU
                </th>
                <th className="border-2 border-black px-4 py-2 text-left">HSN</th>
                <th className="border-2 border-black px-4 py-2 text-left">QTY</th>
                <th className="border-2 border-black px-4 py-2 text-left">UNIT PRICE</th>
                <th className="border-2 border-black px-4 py-2 text-left">TAXABLE VALUE</th>
                <th className="border-2 border-black px-4 py-2 text-left">CGST</th>
                <th className="border-2 border-black px-4 py-2 text-left">SGST</th>
                <th className="border-2 border-black px-4 py-2 text-left">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {shippingLabel.Products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.ProductName}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.HSNCode || "N/A"}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.ProductQty}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.ProductValue}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {(product.ProductValue * product.ProductQty).toFixed(2)}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.CGST || "N/A"}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.SGST || "N/A"}
                  </td>
                  <td className="border-2 border-black px-4 py-2 text-sm">
                    {product.Total || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Section */}
          <div className="mt-4 text-center">
            <p className="text-sm border-b-2 border-black text-black-800">
              All the disputes are subject to Gujarat jurisdiction only. Goods
              once sold will only be taken back or exchanged as per the brand’s
              exchange/return policy.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>AWB:</strong> {shippingLabel.AWBNumber}
              <br />
              <strong>Routing Code:</strong> {shippingLabel.RoutingCode}
              <br />
              <strong>ORDER ID:</strong> {shippingLabel.OrderId}
              <br />
              <strong>INVOICE DATE:</strong> {shippingLabel.InvoiceDate}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE LABEL
              GENERATED BY
            </p>
            <span className="inline-block bg-black text-white px-4 py-2 mt-4 font-bold">
              SECURED SHIPMENT BY LORITH FRANCE
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;