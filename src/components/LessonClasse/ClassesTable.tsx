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
import { ChevronLeft, ChevronRight, LoaderIcon, Search } from "lucide-react";
import { Input } from "../ui/input";

// Define the type for a single class
interface LessonClass {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ClassesTable = () => {
  const [classes, setClasses] = useState<LessonClass[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromItem, setFromItem] = useState(1);
  const [toItem, setToItem] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchClasses = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const response = await apiClient(`/classes?page=${page}&query=${query}`, {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSearch = () => {
    fetchClasses(1, searchTerm);
  };

  const onPageChange = (page: number) => {
    fetchClasses(page, searchTerm);
  };

  return (
    <div className="mx-auto max-w-[350px] py-6 md:max-w-7xl md:px-6 xl:px-7.5">
      <div className="mb-2 flex w-full justify-between">
        <div className="mb-2 flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="button" onClick={handleSearch}>
            <Search />
          </Button>
        </div>
        {loading && (
          <div className="flex items-center text-sm font-medium gap-3 text-primary">
            <LoaderIcon
              className={`h-6 w-6 ${loading ? "animate-spin" : "hidden"}`}
              />
              Loading
          </div>
        )}
      </div>
      <Table className="w-full overflow-x-auto">
        <TableCaption className="my-2">
          Showing {itemsPerPage} items per page from item {fromItem} to {toItem}{" "}
          of {totalItems} total items.
        </TableCaption>
        <TableCaption>
          <div className="flex justify-between gap-2">
            <button
              onClick={() => onPageChange(1)}
              className={`flex cursor-pointer items-center rounded-md bg-gray-100 p-3 hover:bg-gray-200 ${
                currentPage === 1 && "cursor-not-allowed bg-gray-200"
              }`}
              disabled={currentPage === 1}
            >
              <div className="flex items-center gap-0">
                <ChevronLeft size={16} className="-mr-2" />
                <ChevronLeft size={16} />
              </div>
              First page
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`flex cursor-pointer items-center rounded-md bg-gray-100 p-3 hover:bg-gray-200 ${
                currentPage === totalPages && "cursor-not-allowed bg-gray-200"
              }`}
              disabled={currentPage === totalPages}
            >
              Last page
              <div className="flex items-center gap-0">
                <ChevronRight size={16} className="-mr-2" />
                <ChevronRight size={16} />
              </div>
            </button>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
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
