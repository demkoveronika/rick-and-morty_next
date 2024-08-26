import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlledOpenSelect() {
  const [status, setStatus] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="" disabled selected>
            <p>Status</p>
          </MenuItem>
          <MenuItem value={'Alive'}>Alive</MenuItem>
          <MenuItem value={'Died'}>Died</MenuItem>
          <MenuItem value={'Uknown'}>Uknown</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}