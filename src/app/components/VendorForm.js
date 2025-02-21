"use client";

import { useState } from "react";

export default function VendorForm({ vendor, onSubmit }) {
  const [formData, setFormData] = useState(vendor || {
    vendorName: "",
    bankAccountNo: "",
    bankName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="Vendor Name" required />
      <input type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} placeholder="Bank Account No" required />
      <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" />
      <button type="submit">Save Vendor</button>
    </form>
  );
}
