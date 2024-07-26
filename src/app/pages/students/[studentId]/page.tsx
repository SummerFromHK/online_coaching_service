import React from 'react';
import { Box } from '@mui/material';
import NavBar from '@/app/components/client/views/NavBar';
import StudentViewSlots from '@/app/components/client/views/StudentViewSlots';

const StudentPage = ({ params }: { params: { studentId: string } }) => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ m: '10px' }}>
        <StudentViewSlots studentId={params.studentId} />
      </Box>
    </Box>
  );
};

export default StudentPage;
