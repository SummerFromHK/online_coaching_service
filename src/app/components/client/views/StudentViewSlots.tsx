'use client';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Slot from './Slot';

const fetchBookedSlots = async (studentId: string) => {
  return await axios.get(
    `/api/students/${studentId}/slots?isBookedByStudent=${true}`,
  );
};

const fetchBookableSlots = async (studentId: string) => {
  const from = moment().utc().format('YYYY-MM-DD HH:mm');
  return await axios.get(`/api/students/${studentId}/slots?from=${from}`);
};

const StudentViewSlots = ({ studentId }: { studentId: string }) => {
  const [bookableSlots, setBookableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [shouldRefetch, setShouldRefretch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldRefetch) {
      setIsLoading(true);
      Promise.all([fetchBookedSlots(studentId), fetchBookableSlots(studentId)])
        .then(([res1, res2]) => {
          setBookedSlots(res1.data);
          setBookableSlots(res2.data);
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setShouldRefretch(false);
          setIsLoading(false);
        });
    }
  }, [studentId, shouldRefetch]);

  const handleRefetch = () => {
    setShouldRefretch(true);
  };

  return (
    <Box sx={{ pb: '100px', mx: 'auto' }}>
      <Box sx={{ m: '10px', fontWeight: '500', fontSize: '18px' }}>
        My Bookings
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {isLoading && <CircularProgress />}
        {!isLoading && bookedSlots.length == 0 && (
          <Typography sx={{ m: '10px' }}>No current bookings</Typography>
        )}
        {!isLoading &&
          bookedSlots.map((slot: any) => (
            <Slot key={slot.id} studentId={studentId} slot={slot} />
          ))}
      </Box>
      <Box sx={{ m: '10px', fontWeight: '500', fontSize: '18px' }}>
        All Available Slots
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {isLoading && <CircularProgress />}
        {!isLoading && bookableSlots.length == 0 && (
          <Typography sx={{ m: '10px' }}>No spot available</Typography>
        )}
        {!isLoading &&
          bookableSlots.map((slot: any) => (
            <Slot
              key={slot.id}
              studentId={studentId}
              slot={slot}
              onSlotBook={handleRefetch}
              isBookable={true}
            />
          ))}
      </Box>
    </Box>
  );
};
export default StudentViewSlots;
