import PropertyAddForm from "@/components/PropertyAddForm";
import React from "react";

export default function AddPropertyPage() {
  return (
    <section className="bg-violet-200 min-h-screen">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-slate-50 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
}
