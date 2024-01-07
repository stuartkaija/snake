import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction } from 'react';

type BasicSelectProps<T> = {
  name: string;
  value: string;
  options: string[];
  setState: Dispatch<SetStateAction<string>>;
};

export default function BasicSelect<T>({ 
  name,
  value,
  options,
  setState 
}: BasicSelectProps<T>) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setState(event.target.value as SetStateAction<string>);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-labelId`}>{name}</InputLabel>
        <Select
          sx={{
            borderRadius: '0.5rem',
            margin: '1rem',
            fontSize: '1em',
            fontWeight: '500',
            fontFamily: 'inherit',
            color: 'black',
            backgroundColor: 'white',
            transition: 'border-color 0.25s',
            '&:hover': {
              borderColor: '#646cff'
            }
          }}
          labelId={`${name}-labelId`}
          id={`${name}-id`}
          value={value}
          label={name}
          onChange={handleChange}
        >
          {options.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box >
  );
}
