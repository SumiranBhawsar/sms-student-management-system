import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Replace with actual data fetching
async function getDepartments() {
    return [
        { id: 'cs', name: 'Computer Science', hod: 'Dr. Alan Turing', facultyCount: 15, courseCount: 5 },
        { id: 'phy', name: 'Physics', hod: 'Dr. Marie Curie', facultyCount: 10, courseCount: 3 },
        { id: 'math', name: 'Mathematics', hod: 'Dr. Ada Lovelace', facultyCount: 12, courseCount: 4 },
    ];
}


export default async function DepartmentsPage() {
    const departments = await getDepartments();
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Departments</h2>
                <Button>Add New Department</Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Department Name</TableHead>
                                <TableHead>Head of Department (HOD)</TableHead>
                                <TableHead>Faculty Count</TableHead>
                                <TableHead>Courses</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departments.map((dept) => (
                                <TableRow key={dept.id}>
                                    <TableCell className="font-medium">{dept.name}</TableCell>
                                    <TableCell>{dept.hod}</TableCell>
                                    <TableCell>{dept.facultyCount}</TableCell>
                                    <TableCell>{dept.courseCount}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}