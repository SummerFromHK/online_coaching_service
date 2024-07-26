import NavBar from '@/app/components/client/views/NavBar';
import React from 'react';
import { Box } from '@mui/material';
import CoachViewSlots from '@/app/components/client/views/CoachViewSlots';

const CoachPage = ({ params }: { params: { coachId: string } }) => {
  return (
    <Box>
      <NavBar />
      <CoachViewSlots coachId={params.coachId} />
    </Box>
  );
};

export default CoachPage;
