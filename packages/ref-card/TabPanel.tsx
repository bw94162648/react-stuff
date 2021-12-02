import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  selectedTab: number;
}

export default function TabPanel( props: TabPanelProps ) {
  const { children, selectedTab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {selectedTab === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

