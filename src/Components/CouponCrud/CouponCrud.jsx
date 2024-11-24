import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CouponCRUD = () => {
  const [coupons, setCoupons] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({
    id: null,
    code: "",
    discount: "",
    expirationDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (coupon = { id: null, code: "", discount: "", expirationDate: "" }) => {
    setIsEditing(!!coupon.id);
    setCurrentCoupon(coupon);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCoupon({ id: null, code: "", discount: "", expirationDate: "" });
  };

  const handleSaveCoupon = () => {
    if (isEditing) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === currentCoupon.id ? currentCoupon : coupon
        )
      );
    } else {
      setCoupons((prev) => [
        ...prev,
        { ...currentCoupon, id: Date.now() }, // Generate unique ID
      ]);
    }
    handleCloseDialog();
  };

  const handleDeleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
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
          boxShadow: "none",
          outline: "none",
        }}
      >
        Gerenciamento de Cupons
      </Typography>
      <Button
        variant="contained"
        sx={{
          marginBottom: 2,
          backgroundColor: "#F54749",
          "&:hover": { backgroundColor: "#D63939" },
        }}
        onClick={() => handleOpenDialog()}
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
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(coupon)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteCoupon(coupon.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Coupon */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Editar Cupom" : "Adicionar Cupom"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Código"
            margin="dense"
            value={currentCoupon.code}
            onChange={(e) =>
              setCurrentCoupon({ ...currentCoupon, code: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Desconto (%)"
            margin="dense"
            value={currentCoupon.discount}
            onChange={(e) =>
              setCurrentCoupon({ ...currentCoupon, discount: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Data de Expiração"
            margin="dense"
            type="date"
            value={currentCoupon.expirationDate}
            onChange={(e) =>
              setCurrentCoupon({
                ...currentCoupon,
                expirationDate: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveCoupon}
            sx={{
              backgroundColor: "#F54749",
              "&:hover": { backgroundColor: "#D63939" },
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CouponCRUD;
