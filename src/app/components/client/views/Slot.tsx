'use client';
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import Tag from './Tag';

const Slot = ({
  slot,
  coachId, //coachId presents means this is a coach's path
  studentId, //studentId presents means this is a coach's path
  isBookable = false,
  onSlotBook,
}: {
  slot: any;
  coachId?: string;
  studentId?: string;
  isBookable?: boolean;
  onSlotBook?: () => void;
}) => {
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = () => {
    setIsBooking(true);
    axios
      .post(`/api/students/${studentId}/slots`, {
        slotId: slot.id,
      })
      .then((res) => {
        if (onSlotBook) {
          onSlotBook();
        }
      })
      .catch((err) => console.error('Error booking a slot'))
      .finally(() => {
        setIsBooking(false);
      });
  };

  return (
    <Box
      sx={{
        width: '240px',
        border: 'solid 1px black',
        borderRadius: '12px',
        m: '8px',
        p: '15px',
      }}
    >
      <Box>{`Date Time: ${moment(slot.startTime)
        .local()
        .format('YYYY-MM-DD HH:mm')}`}</Box>
      {coachId && (
        <Box>{`Booked by: ${slot.bookedBy ? slot.bookedBy : 'N/A'}`}</Box>
      )}
      {coachId && slot.bookedBy && (
        <Box>{`Satisfaction: ${
          slot.satisfaction ? slot.satisfaction : 'N/A'
        }`}</Box>
      )}
      {coachId && slot.bookedBy && (
        <Box>{`Note: ${slot.note ? slot.note : 'N/A'}`}</Box>
      )}
      {coachId && slot.bookedBy && (
        <Box>{`Contact: ${slot.studentNumber}`}</Box>
      )}
      {coachId && !slot.bookedBy && (
        <Tag text="Available" backgroundColor="green" />
      )}
      {coachId && slot.bookedBy && <Tag text="Booked" backgroundColor="grey" />}
      {studentId && <Box>{`Hosted by: ${slot.hostedBy}`}</Box>}
      {studentId && slot.bookedBy && (
        <Box>{`Contact: ${slot.coachNumber}`}</Box>
      )}
      {isBookable && (
        <Button
          disabled={isBooking}
          onClick={handleBooking}
          variant="contained"
          sx={{
            p: '10px',
            mt: '12px',
            borderRadius: '10px',
            fontSize: '12px',
          }}
        >
          Book
        </Button>
      )}
    </Box>
  );
};

export default Slot;
