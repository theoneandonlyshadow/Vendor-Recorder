"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateVendorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // when it isnt loading, redirect to home route
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/");
    }
  }, [session, status, router]);

  // checkin auth
  if (status === "loading" || !session) {
    return <p>you need to be signed in to create a vendor.</p>;
  }

  const [vendorName, setVendorName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/vendors", {
      method: "POST",
      body: JSON.stringify({
        vendorName,
        bankAccountNo,
        bankName,
        address,
        city,
        country,
        zipCode,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/vendors");
    } else {
      console.error("error when creating vendor");
    }
  };

  return (
    <div className="container">
      <p>Signed in as {session.user.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      <h1>create vendor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vendor Name"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="bank account number"
          value={bankAccountNo}
          onChange={(e) => setBankAccountNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="bank name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="address line 1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button type="submit">create vendor</button>
      </form>
    </div>
  );
}
