"use client";
import apiClient from "@/apiClient";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import SitePagination from "../SitePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the type for a single class
interface LessonClass {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Define the type for the API response
interface ClassesResponse {
  data: LessonClass[];
}

const ClassesTable = () => {
  const [classes, setClasses] = useState<LessonClass[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromItem, setFromItem] = useState(1);
  const [toItem, setToItem] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { token } = useAuth();

  const getClasses = async () => {
    try {
      
      const response = await apiClient("/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClasses(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setFromItem(response.data.from);
      setToItem(response.data.to);
      setItemsPerPage(response.data.per_page);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const onPageChange = async (page: number) => {
    try {
      const response = await apiClient(`/classes?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClasses(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setFromItem(response.data.from);
      setToItem(response.data.to);
      setItemsPerPage(response.data.per_page);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-[350px] py-6 md:max-w-7xl md:px-6 xl:px-7.5">
      <Table className="w-full overflow-x-auto">
        <TableCaption className="my-2">
          Showing {itemsPerPage} items per page from item {fromItem} to {toItem}{" "}
          of {totalItems} total items .{" "}
        </TableCaption>
        <TableCaption className="">
          <div className="flex justify-between">
            <button
              onClick={() => onPageChange(1)}
              className={`flex cursor-pointer items-center rounded-md bg-gray-100 p-3 hover:bg-gray-200 ${currentPage === 1 && "cursor-not-allowed bg-gray-200"} `}
              disabled={currentPage === 1}
            >
              <div className="flex items-center gap-0 ">
                <ChevronLeft size={16} className="-mr-2" />
                <ChevronLeft size={16} className="" />
              </div>
              First page
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`flex cursor-pointer items-center rounded-md bg-gray-100 p-3 hover:bg-gray-200 ${currentPage === totalPages && "cursor-not-allowed bg-gray-200"}`}
              disabled={currentPage === totalPages}
            >
              Last page
              <div className="flex items-center gap-0 ">
                <ChevronRight size={16} className="-mr-2" />
                <ChevronRight size={16} className="" />
              </div>
            </button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="sm:w-auto">ID</TableHead> */}
            <TableHead className="sm:w-auto">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-full sm:w-auto">Price</TableHead>
            <TableHead className="w-full text-right sm:w-auto">
              Method
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((lessonClass) => (
            <TableRow key={lessonClass.id}>
              {/* <TableCell className="font-medium">{lessonClass.id}</TableCell> */}
              <TableCell className="font-medium">{lessonClass.title}</TableCell>
              <TableCell>
                {lessonClass.description.slice(0, 30) +
                  (lessonClass.description.length > 30 ? "..." : "")}
              </TableCell>
              <TableCell>$100</TableCell>
              <TableCell className="text-right">
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ClassesTable;
