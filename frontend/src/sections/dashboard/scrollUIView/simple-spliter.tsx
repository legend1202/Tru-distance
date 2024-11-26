import React, { useState } from 'react';

import { Box } from '@mui/system';

const SimpleSplitter = ({ id = 'drag-bar', isDragging, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      id={id}
      data-testid={id}
      tabIndex={0}
      width="100%"
      height={5}
      bgcolor={isDragging || isFocused ? 'primary.main' : 'grey.400'}
      sx={{
        cursor: 'col-resize',
        transition: 'background-color 0.15s ease-in-out',
        '&:hover': { backgroundColor: 'primary.light' },
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default SimpleSplitter;
