"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VendorForm from "./VendorForm";

export default function EditVendor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [vendor, setVendor] = useState(null);
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/vendors?id=${id}`)
      .then((res) => res.json())
      .then((data) => setVendor(data));
  }, [id]);

  const handleSubmit = async (formData) => {
    await fetch("/api/vendors", {
      method: "PUT",
      body: JSON.stringify({ ...formData, _id: id }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/vendors");
  };

  return vendor ? (
    <VendorForm vendor={vendor} onSubmit={handleSubmit} />
  ) : (
    <p>loading all vendor details...</p>
  );
}
