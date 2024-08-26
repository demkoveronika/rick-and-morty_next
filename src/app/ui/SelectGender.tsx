import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Character } from '@/types/Character';


export default function ControlledOpenSelect() {
  const [gender, setGender] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof gender>) => {
    setGender(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const filteredByGender = () => {
  //   switch (character.gender) {
  //     case 'Male': {
  //       return character.gender === 'Male'
  //     }
  //     case 'Female': {
  //       return character.gender === 'Female'
  //     }

  //     default:
  //       return character.gender;
  //   }
  // }


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="" disabled selected>
            <p>Gender</p>
          </MenuItem>
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}