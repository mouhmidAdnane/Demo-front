import {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useUser from '../Hooks/useUser';

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

export default function DeleteModal({handleClose, open, onUserDeleted}) {

    const {deleteUser}= useUser();

    const handleDelete = async () => {
        await deleteUser(open.id).then(()=>{
            onUserDeleted(open.id);
            handleClose();
        });
    }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open.open}
        sx={{
            outline: 'none',
            border : 'none',
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
              Are you sure you want delete this user?
            </Typography>
           <Button 
           onClick= {handleDelete}
           >Yes</Button>
           <Button onClick={handleClose}>No</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}