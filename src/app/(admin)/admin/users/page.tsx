/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/(admin)/admin/users/page.tsx

"use client";

import { useState } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";

// Define a type for the query key parameters for better type safety
type UserQueryKey = [string, { page: number; filter: string; search: string }];

// Use QueryFunctionContext to correctly type the function parameters
const fetchUsers = async ({ queryKey }: QueryFunctionContext<UserQueryKey>) => {
    const [_key, { page, filter, search }] = queryKey;
    
    // In a real app, you would fetch from an API endpoint like:
    // const { data } = await axios.get('/api/admin/users', { params: { page, filter, search } });
    // return data;

    // Returning mock data for demonstration
    const mockUsers: User[] = [
        { id: '1', email: 'admin@edusys.com', role: 'ADMIN', password: '', createdAt: new Date(), updatedAt: new Date() },
        { id: '2', email: 'hod.cs@edusys.com', role: 'HOD', password: '', createdAt: new Date(), updatedAt: new Date() },
        { id: '3', email: 'prof.smith@edusys.com', role: 'FACULTY', password: '', createdAt: new Date(), updatedAt: new Date() },
        { id: '4', email: 'student123@edusys.com', role: 'STUDENT', password: '', createdAt: new Date(), updatedAt: new Date() },
    ];
    return { users: mockUsers, totalPages: 1 };
};


export default function UserManagementPage() {
  const [page] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", { page, filter, search }],
    queryFn: fetchUsers,
  });

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "HOD":
        return "default";
      case "FACULTY":
        return "secondary";
      case "STUDENT":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button>Add New User</Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input 
          placeholder="Search by email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="HOD">HOD</SelectItem>
            <SelectItem value="FACULTY">Faculty</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                ) : isError ? (
                    <TableRow><TableCell colSpan={4} className="text-center text-red-500">Failed to load users.</TableCell></TableRow>
                ) : (
                    data?.users.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                    </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      {/* Add Pagination component here */}
    </div>
  );
}