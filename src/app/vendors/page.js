"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function VendorsPage() {
  const { data: session } = useSession();
  const [vendors, setVendors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const res = await fetch("/api/vendors");
    const data = await res.json();
    setVendors(data);
  };

  return (
    <div className="container">
      {session ? (
        <>
          <p>Signed in as {session.user.name}</p>
          <button onClick={() => router.push("/vendors/new")}>create new</button>
          <button onClick={() => signOut({ callbackUrl: "/" })}>logout</button>
        </>
      ) : (
        <p>you need to sign in to create new vendors.</p>
      )}
      <h1>vendors list</h1>
      <table className={styles["vendor-table"]}>
        <thead>
          <tr>
            <th>vendor name</th>
            <th>bank account no.</th>
            <th>bank name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorName}</td>
              <td>{vendor.bankAccountNo}</td>
              <td>{vendor.bankName}</td>
              <td>
                <button onClick={() => router.push(`/vendors/edit?id=${vendor._id}`)}>edit</button>
                <button
                  onClick={async () => {
                    if (confirm("do you really want to delete this vendor?")) {
                      await fetch("/api/vendors", {
                        method: "DELETE",
                        body: JSON.stringify({ _id: vendor._id }),
                        headers: { "Content-Type": "application/json" },
                      });
                      fetchVendors();
                    }
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
