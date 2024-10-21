import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";

type AuditLog = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
};

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Role Created",
    user: "Admin",
    timestamp: "2023-09-15 10:30:00",
    details: "Created new role: Editor",
  },
  {
    id: "2",
    action: "Permission Added",
    user: "Manager",
    timestamp: "2023-09-15 11:45:00",
    details: 'Added "Delete Products" permission to Manager role',
  },
  {
    id: "3",
    action: "Role Deleted",
    user: "Admin",
    timestamp: "2023-09-16 09:15:00",
    details: "Deleted role: Guest",
  },
  {
    id: "4",
    action: "Role Updated",
    user: "Admin",
    timestamp: "2023-09-16 14:20:00",
    details: "Updated permissions for role: Support",
  },
  {
    id: "5",
    action: "Role Hierarchy Changed",
    user: "Manager",
    timestamp: "2023-09-17 16:00:00",
    details: "Reordered role hierarchy",
  },
];

export function AuditLogs() {
  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableColumn>Action</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Timestamp</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody>
          {mockAuditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
