"use client";

import { useState } from "react";
import { useTickets } from "@/app/hooks/useTickets";
import TicketForm from "./TicketForm";
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function TicketsAdmin() {
  const { tickets, isLoading, fetchTickets, handleDelete } = useTickets();
  const [editingTicket, setEditingTicket] = useState<{ id: number; price: number } | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎟 Quản lý Vé</h1>

      <TicketForm editingTicket={editingTicket} onSaved={fetchTickets} />

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Giá vé</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.price.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" size="small" onClick={() => setEditingTicket(ticket)}>
                      ✏ Sửa
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(ticket.id)} className="ml-2">
                      ❌ Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
