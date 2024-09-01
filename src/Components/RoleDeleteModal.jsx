import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteRoleModal({ handleClose, open, deleteRole }) {
console.log(open)

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {

    console.log(open)
    if (!open["role"]?.id) {
      console.error('No valid role ID provided');
      handleClose();
      return;
    }

    setDeleting(true);
    try {
      await deleteRole(open["role"].id);
      handleClose();  // Close modal on successful deletion
    } catch (error) {
      console.error('Failed to delete role:', error);
      // Optionally, show error message to user here
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open.open}
        sx={{
          outline: 'none',
          border: 'none',
        }}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this role?
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                onClick={handleDelete}
                disabled={deleting}
                sx={{ marginRight: 2 }}
                variant="contained"
                color="error"
              >
                {deleting ? "Deleting..." : "Yes"}
              </Button>
              <Button onClick={handleClose} variant="outlined" color="primary">
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
