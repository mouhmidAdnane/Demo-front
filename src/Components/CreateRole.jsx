import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import useRole from '../Hooks/useRole';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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

export default function CreateRole({ handleClose, open }) {

    console.log(open)
//   const { createRole, errors } = useRole();
//   const [name, setName] = useState(open.type === "update" ? open.role.name : '');
//   const [description, setDescription] = useState(open.type === "update" ? open.role.description : '');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const result = await createRole({
//       name: name,
//       description: description,
//     });
    
//     if (result.success) {
//       handleClose();
//       setName('');
//       setDescription('');
//     }
//   };

  return (
    <div>
      {/* <Modal
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
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      label="Title"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name && <span style={{ color: 'red', fontSize: 12 }}>{errors.name}</span>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="description"
                      required
                      fullWidth
                      label="Description"
                      multiline
                      minRows={2}
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors?.description && <span style={{ color: 'red', fontSize: 12 }}>{errors.description}</span>}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {open.type === "update" ? "Update Role" : "Add Role"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal> */}
    </div>
  );
}
