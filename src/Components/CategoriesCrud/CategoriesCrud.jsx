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

const CategoryCRUD = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (category = { id: null, name: "", description: "" }) => {
    setIsEditing(!!category.id);
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ id: null, name: "", description: "" });
  };

  const handleSaveCategory = () => {
    if (isEditing) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === currentCategory.id ? currentCategory : category
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { ...currentCategory, id: Date.now() }, // Generate unique ID
      ]);
    }
    handleCloseDialog();
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
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
        Gerenciamento de Categorias
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: 2, backgroundColor: "#F54749", "&:hover": { backgroundColor: "#D63939" } }}
        onClick={() => handleOpenDialog()}
      >
        Adicionar Categoria
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(category)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Category */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Editar Categoria" : "Adicionar Categoria"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            margin="dense"
            value={currentCategory.name}
            onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Descrição"
            margin="dense"
            value={currentCategory.description}
            onChange={(e) =>
              setCurrentCategory({ ...currentCategory, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveCategory}
            sx={{ backgroundColor: "#F54749", "&:hover": { backgroundColor: "#D63939" } }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryCRUD;
