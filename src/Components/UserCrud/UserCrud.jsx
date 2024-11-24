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
import AddUser from "./AddUser";

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [nextId, setNextId] = useState(1); // Initial ID count

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setNextId((prev) => prev + 1); // Increment ID counter
    setShowAddUser(false);
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
        Gerenciamento de Usuários
      </Typography>
      {!showAddUser ? (
        <>
          <Button
            variant="contained"
            sx={{
              marginBottom: 2,
              backgroundColor: "#F54749",
              "&:hover": { backgroundColor: "#D63939" },
            }}
            onClick={() => setShowAddUser(true)}
          >
            Adicionar Usuário
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Senha</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{"*".repeat(8)}</TableCell> {/* Hidden password */}
                    <TableCell align="center">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          setUsers((prev) =>
                            prev.filter((u) => u.id !== user.id)
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
        <AddUser onAdd={handleAddUser} nextId={nextId} />
      )}
    </Box>
  );
};

export default UserCRUD;