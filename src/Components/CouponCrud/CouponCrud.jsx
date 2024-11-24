import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddCoupon from "./AddCoupon";

const CouponCRUD = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleAddCoupon = (newCoupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
    setNextId((prev) => prev + 1); // Increment ID counter
    setShowAddCoupon(false);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#F9F9FA",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "#80869A",
        }}
      >
        Gerenciamento de Cupons
      </Typography>
      {!showAddCoupon ? (
        <>
          <Button
            variant="contained"
            sx={{
              marginBottom: 2,
              backgroundColor: "#F54749",
              "&:hover": { backgroundColor: "#D63939" },
            }}
            onClick={() => setShowAddCoupon(true)}
          >
            Adicionar Cupom
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Desconto (%)</TableCell>
                  <TableCell>Data de Expiração</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>{coupon.id}</TableCell>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>{coupon.discount}</TableCell>
                    <TableCell>{coupon.expirationDate}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          setCoupons((prev) =>
                            prev.filter((c) => c.id !== coupon.id)
                          )
                        }
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <AddCoupon onAdd={handleAddCoupon} nextId={nextId} />
      )}
    </Box>
  );
};

export default CouponCRUD;
