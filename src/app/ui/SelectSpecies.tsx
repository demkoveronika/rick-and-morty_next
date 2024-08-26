import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlledOpenSelect() {
  const [species, setSpecies] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof species>) => {
    setSpecies(event.target.value);
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
        <InputLabel id="demo-controlled-open-select-label">Species</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={species}
          label="Species"
          onChange={handleChange}
        >
          <MenuItem value="" disabled selected>
            <p>Species</p>
          </MenuItem>
          <MenuItem value={'Human'}>Human</MenuItem>
          <MenuItem value={'Alien'}>Alien</MenuItem>
          <MenuItem value={'Robot'}>Robot</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}