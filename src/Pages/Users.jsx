import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import Pagination from '@mui/material/Pagination';
import useUser from "../Hooks/useUser";
import "../styles/users.scss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { defaultRessourcesPerPage } from "../Utils/Variables";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from "@mui/material";
import DeleteModal from "../Components/deleteModal";
import useRole from "../Hooks/useRole"
import UserModal from "../Components/UserModal";
import { useAuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";


const Users = () => {
    const { user, userRoles } = useAuthContext();
    const navigate= useNavigate()

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultRessourcesPerPage);

    
    const { getUsers, users, setUsers, loading, error, metadata, createUser } = useUser();
    const [selectedUser, setSelectedUser] = useState(null);
    const { getRoles, roles } = useRole()

    const [open, setOpen] = useState({ open: false, type: null, id: null });

    const handleDeleteOpen = (id) => setOpen({ open: true, type: "delete", id: id });
    const handleUpdateOpen = (row) => {
        setSelectedUser(row)
        setOpen({ open: true, type: "update", user: row })
    };
    const handleCreateOpen = () => setOpen({ open: true, type: "create" });
    const handleClose = () => setOpen({ open: false, type: null });

    // const [selectedId, setSelectedId] = useState(null);
    // const resetId = () => {
    //     setSelectedId(null)
    // }

    useEffect(() => {
        getUsers(page, pageSize);
    }, [page, pageSize]);


    useEffect(() => {
        getRoles(true);

    }, [])


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onUserDeleted = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };


    if(user === null){
        navigate('/login')
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!users || users.length === 0) return <p>No data</p>;

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <Button onClick={handleCreateOpen}>Add user</Button>
                <TableContainer component={Paper} sx={{ margin: 2 }} className="table" >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone number</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.first_name}</TableCell>
                                    <TableCell align="center">{row.last_name}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" startIcon={<DeleteIcon />}
                                            onClick={() => {
                                                // setSelectedId(row.id);
                                                handleDeleteOpen(row.id)
                                            }}
                                            sx={{
                                                color: colors.red[500],
                                                borderColor: colors.red[500],
                                                marginRight: 2,
                                                ':hover': {
                                                    borderColor: colors.red[500],
                                                    backgroundColor: colors.red[50],
                                                }
                                            }}>
                                            Delete
                                        </Button>

                                        <Button variant="outlined" startIcon={<EditIcon />}
                                            onClick={() => {
                                                handleUpdateOpen(row)
                                            }}
                                            sx={{
                                                color: colors.blue[500],
                                                borderColor: colors.blue[500],
                                                marginRight: 2,
                                                ':hover': {
                                                    borderColor: colors.blue[500],
                                                    backgroundColor: colors.blue[50],
                                                }
                                            }}>

                                            Edit
                                        </Button>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="pagination-container">
                    <Pagination
                        count={parseInt(metadata.lastPage)}
                        variant="outlined"
                        shape="rounded"
                        page={page}
                        onChange={handlePageChange}
                        sx={{ margin: 2 }}
                    />
                    <div className="pageSize-container">
                        <InputLabel id="pageSize" sx={{ marginRight: 1 }}>Page Size</InputLabel>
                        <Select
                            labelId="pageSize"
                            value={pageSize}
                            label="Page size"
                            onChange={handlePageSizeChange}
                            size="small"
                            sx={{ width: 100 }}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>


            {open.type === "delete" && <DeleteModal open={open} handleClose={handleClose} handleOpen={handleDeleteOpen} onUserDeleted={onUserDeleted} />}


            {open.type === "create" && <UserModal open={open} handleClose={handleClose} handleOpen={handleCreateOpen} roles={roles} />}

            {open.type === "update" && <UserModal open={open} handleClose={handleClose} handleOpen={handleCreateOpen} roles={roles} user={selectedUser} />}

            open
        </div>
    );
};

export default Users;
