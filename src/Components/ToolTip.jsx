import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips({children, content}) {
  return (
    <Tooltip title={content} arrow>
    {children}
  </Tooltip>
  );
}