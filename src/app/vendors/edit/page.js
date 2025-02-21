"use client";

import { Suspense } from "react";
import EditVendor from "../../components/EditVendor";

export default function EditVendorPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <EditVendor />
    </Suspense>
  );
}
