import RoleCard from '../Components/RoleCard';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/SideBar';
import '../styles/roles.scss';
import useRole from '../Hooks/useRole';
import Button from '@mui/material/Button';
import CreateRole from '../Components/CreateRole';
import DeleteRoleModal from '../Components/RoleDeleteModal';

export default function Roles() {
  const { getRoles, updateRole, deleteRole, roles, loading, error, createRole } = useRole();

  const [selectedRole, setSelectedRole] = useState(null);
  const [open, setOpen] = useState({ type: null, open: false, role: null });

  useEffect(() => {
    getRoles();
  }, []);

  const handleSelectedRole = (role, type) => {
    setSelectedRole(role);
    if (type === 'delete') handleDeleteOpen();
    if (type === 'update') handleUpdateOpen();
    debugger
  };

  const handleDeleteOpen = () =>{ setOpen({ type: 'delete', open: true, role: selectedRole })
  console.log(selectedRole)};
  const handleUpdateOpen = () => {
    setOpen({ type: 'update', open: true, role: selectedRole })
    console.log(selectedRole)
};
  const handleCreateOpen = () => setOpen({ type: 'create', open: true });
  const handleClose = () => setOpen({ type: null, open: false, role: null });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!roles || roles.length === 0) return <p>No data</p>;

  return (
    <div className='container'>
      <Sidebar />
      <div className='main-content'>
        <Button onClick={handleCreateOpen}>Add Role</Button>
        {/* {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            handleSelectedRole={(role, type) => handleSelectedRole(role, type)}
            deleteRole={deleteRole}
            updateRole={updateRole}
          />
        ))} */}
{/* 
        {open.type === 'create' && <CreateRole open={open} handleClose={handleClose} />}
        {open.type === 'update' && <CreateRole open={open} handleClose={handleClose} updateRole= {updateRole}/>}
        {open.type === 'delete' && <DeleteRoleModal open={open} handleClose={handleClose} deleteRole={deleteRole} />} */}
      </div>
    </div>
  );
}
