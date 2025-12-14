import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import { getTransactions } from "../services/paymentServices";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mx: "auto", my: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Transaction History
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : transactions.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
          No transactions found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Job</b>
              </TableCell>
              <TableCell>
                <b>Client</b>
              </TableCell>
              <TableCell>
                <b>Freelancer</b>
              </TableCell>
              <TableCell>
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id} hover>
                <TableCell>{tx.job?.title || "-"}</TableCell>
                <TableCell>{tx.client?.name || "-"}</TableCell>
                <TableCell>{tx.freelancer?.name || "-"}</TableCell>

                <TableCell>Rs.{(tx.amount / 100).toFixed(2)}</TableCell>

                <TableCell>
                  <Chip
                    label={tx.status}
                    size="small"
                    color={
                      tx.status === "paid"
                        ? "success"
                        : tx.status === "pending"
                        ? "warning"
                        : "default"
                    }
                  />
                </TableCell>

                <TableCell>
                  {new Date(tx.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
