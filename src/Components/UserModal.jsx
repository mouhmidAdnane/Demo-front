
import {useState} from "react"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import useUser from '../Hooks/useUser';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MultipleSelect from "./MultipleSelect";



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

export default function UserModal({handleClose, open, roles, type, user}) {

    const {createUser, updateUser, errors}= useUser();


        const [firstName, setFirstName] = useState(open.type==="update" ? open.user.first_name : '');
        const [lastName, setLastName] = useState(open.type==="update" ? open.user.last_name : '');
        const [email, setEmail] = useState(open.type==="update" ? open.user.email : '');
        const [phone, setPhone] = useState(open.type==="update" ? open.user.phone : '');
        const [password, setPassword] = useState('');
        const [c_password, setC_password] = useState('');
        // const [rolesSelected, setRolesSelected] = useState(open.type==="update" ? user.roles : []);
        const [rolesSelected, setRolesSelected] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        let data= {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password,
            c_password: c_password
        }
        if(roles.length !== 0)
            data.roles = rolesSelected


        const result =open.type === "update" ? await updateUser(open.user.id, data) : await createUser(data);


    
        // Only close the modal if the user creation was successful
        if (result.success) {
            handleClose();
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setC_password('');
            setRolesSelected([]);
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
            border : 'none',
        }}
        onClose={()=>{handleClose()}}
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
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                //   id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                  value={open.type==="update" ? firstName : ''}
                />
                {errors?.first_name && <span style={{ color: 'red' , fontSize: 12}}>{errors.first_name}</span>}

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={open.type==="update" ? lastName : ''}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors?.last_name && <span style={{ color: 'red' , fontSize: 12}}>{errors.last_name}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={open.type==="update" ? email : ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors?.email && <span style={{ color: 'red' , fontSize: 12}}>{errors.email}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone number"
                  name="phone"
                  autoComplete="phone"
                  type="number"
                  value={open.type==="update" ? phone : ''}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors?.phone && <span style={{ color: 'red' , fontSize: 12}}>{errors.phone}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                value={open.type==="update" ? password : ''}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors?.password && <span style={{ color: 'red' , fontSize: 12}}>{errors.password}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="c_password"
                  label="Password Confirmation"
                  type="password"
                  onChange={(e) => setC_password(e.target.value)}
                />
                {errors?.c_password && <span style={{ color: 'red' , fontSize: 12}}>{errors.c_password}</span>}
              </Grid>
              <Grid item xs={12}>
                <MultipleSelect names= {roles} roleSelected= {rolesSelected} setRoleSelected= {setRolesSelected}/>
              </Grid>
             
            </Grid>
            <Button
                onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                {open.type ==="update" ? "Update user" : "Add user"}
            </Button>
          </Box>
        </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}