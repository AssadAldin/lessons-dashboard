import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Lessons classes Page | lessons dashboard.",
  description: "Classes page for lessons educational dashboard.",
};

function page() {
  return (
    <div>
      <DefaultLayout>
        <div className="mx-auto max-w-7xl">
          <Breadcrumb pageName="Classes" />
        </div>
      </DefaultLayout>
    </div>
  );
}

export default page;
