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
import AddProducts from "./AddProducts";

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [nextId, setNextId] = useState(1);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setNextId((prev) => prev + 1); // Increment ID counter
    setShowAddProduct(false);
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
        Gerenciamento de Produtos
      </Typography>
      {!showAddProduct ? (
        <>
          <Button
            variant="contained"
            sx={{
              marginBottom: 2,
              backgroundColor: "#F54749",
              "&:hover": { backgroundColor: "#D63939" },
            }}
            onClick={() => setShowAddProduct(true)}
          >
            Adicionar Produto
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Estoque</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          setProducts((prev) =>
                            prev.filter((p) => p.id !== product.id)
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
        <AddProducts onAdd={handleAddProduct} nextId={nextId} />
      )}
    </Box>
  );
};

export default ProductCRUD;
