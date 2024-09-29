import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateEmployee = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="m-2">
      <div className="mb-4 flex justify-between items-center">
        <Link
          to={ROUTE_PATHS.USER_EMPLOYEE_LISTS}
          className="flex justify-between items-center gap-x-2 underline text-gray-300 font-medium hover:text-gray-200"
        >
          <div>
            <IoArrowBack />
          </div>
          <div>Back</div>
        </Link>
        <h4 className="text-gray-300">Create Employee</h4>
      </div>
      <form
        className="bg-zinc-800 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end w-full bg-[#343438] rounded-b-lg py-2 pr-4">
          <Button variant={"secondary"} className="w-28" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateEmployee;
