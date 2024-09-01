
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToolTip from './ToolTip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '@mui/material';

export default function RoleCard({ role, handleSelectedRole}) {
  return (
    <Box sx={{ width: 180 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Role ID: {role.id}
          </Typography>
          <Typography variant='h5' component='div'>
            {role.name}
          </Typography>
          <ToolTip content={role.description}>
            <Typography sx={{ mb: 1.5, wordBreak: 'break-all' }} color='text.secondary'>
              {role.description.length > 26 ? role.description.slice(0, 26) + '...' : role.description}
            </Typography>
          </ToolTip>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            startIcon={<DeleteIcon />}
            onClick={() => handleSelectedRole(role, 'delete')}
            sx={{
              color: colors.red[500],
              borderColor: colors.red[500],
              marginRight: 2,
              ':hover': {
                borderColor: colors.red[500],
                backgroundColor: colors.red[50],
              },
            }}
          >
            Delete
          </Button>

          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            onClick={() => handleSelectedRole(role, 'update')}
            sx={{
              color: colors.blue[500],
              borderColor: colors.blue[500],
              marginRight: 2,
              ':hover': {
                borderColor: colors.blue[500],
                backgroundColor: colors.blue[50],
              },
            }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
