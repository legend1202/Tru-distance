import React, { useState, useEffect } from 'react';

import { Radio, RadioGroup, FormControl, FormControlLabel } from '@mui/material';

import { IflowDataItemChildMoveOption } from 'src/types/flowData';

type Props = {
  data: IflowDataItemChildMoveOption[];
  optionIndex: number;
  setCurrentWorkflowPosition: (pos: number[]) => void;
  handleCurrentStatus: (status: number, statusFlag: boolean) => void;
};
const MoveOptionGroup = ({
  data,
  optionIndex,
  setCurrentWorkflowPosition,
  handleCurrentStatus,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleClickItem = (pos: number[], index: number) => {
    handleCurrentStatus(index, true);
    setCurrentWorkflowPosition(pos);
  };

  useEffect(() => {
    if (optionIndex > 0) {
      setSelectedValue(data[optionIndex - 1]?.title || '');
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
        {data.map((moveOption, index) => (
          <FormControlLabel
            key={index}
            value={moveOption?.title || ''}
            control={<Radio onClick={() => handleClickItem(moveOption.next, index + 1)} />}
            label={moveOption.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MoveOptionGroup;
