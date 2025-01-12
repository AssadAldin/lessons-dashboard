import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ClassesTable from "@/components/LessonClasse/ClassesTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Lessons classes Page | lessons dashboard.",
  description: "Classes page for lessons educational dashboard.",
};

function page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Classes" />
      <ClassesTable />
    </DefaultLayout>
  );
}

export default page;
