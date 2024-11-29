import React, { useState, useEffect } from 'react';

import { Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';

type Props = {
  data: string[];
  optionIndex: number;
  handleCurrentStatus: (status: number, statusFlag: boolean) => void;
};
const SelectOptionGroup = ({ data, optionIndex, handleCurrentStatus }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleClickItem = (index: number) => {
    handleCurrentStatus(index, true);
  };

  useEffect(() => {
    if (optionIndex > 0) {
      setSelectedValue(data[optionIndex - 1]);
    }
  }, [data, optionIndex]);

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={handleChange}
      >
        {data.map((selectOption, index) => (
          <FormControlLabel
            key={index}
            value={selectOption}
            control={<Radio onClick={() => handleClickItem(index + 1)} />}
            label={selectOption}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectOptionGroup;
