'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import moment, { utc } from 'moment';
import Slot from './Slot';

const fetchPastSlots = async (coachId: string) => {
  const to = moment().utc().format('YYYY-MM-DD HH:mm');
  return await axios.get(`/api/coaches/${coachId}/slots?to=${to}`);
};

const fetchUpcomingSlots = async (coachId: string) => {
  const from = moment().utc().format('YYYY-MM-DD');
  return await axios.get(`/api/coaches/${coachId}/slots?from=${from}`);
};

//TODO: add "add feedback" button to enable satisfaction and note adding

//TODO: add check to ensure new slot not overlap with any existing slots for coach
const canCreateSlot = () => {};

const CoachViewSlots = ({ coachId }: { coachId: string }) => {
  const [pastSlots, setPastSlots] = useState([]);
  const [upcomingSlots, setUpcomingSlots] = useState([]);
  const [newSlotDate, setNewSlotDate] = useState('');
  const [newSlotHour, setNewSlotHour] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const [isUpcomingLoading, setUpcomingtIsLoading] = useState(false);
  const [isPastSlotLoading, setIsPastSlotLoading] = useState(false);
  const [shouldRefetch, setShouldRefretch] = useState(true);

  useEffect(() => {
    if (shouldRefetch) {
      setUpcomingtIsLoading(true);
      fetchUpcomingSlots(coachId)
        .then((res) => setUpcomingSlots(res.data))
        .catch((e) => console.error('error fetching upcoming slots', e))
        .finally(() => {
          setShouldRefretch(false);
          setUpcomingtIsLoading(false);
        });
    }
  }, [coachId, shouldRefetch]);

  useEffect(() => {
    setIsPastSlotLoading(true);
    fetchPastSlots(coachId)
      .then((res) => setPastSlots(res.data))
      .catch((e) => console.error('error fetching past slots', e))
      .finally(() => setIsPastSlotLoading(false));
  }, [coachId]);

  const handleAddSlot = () => {
    setIsCreating(true);
    const dateTimeStr = `${newSlotDate} ${newSlotHour}:00:00`;
    axios
      .post(`/api/coaches/${coachId}/slots`, {
        startTime: dateTimeStr,
      })
      .catch((e) => console.error('Error creating new slot', e))
      .finally(() => {
        setIsCreating(false);
        setNewSlotDate('');
        setNewSlotHour('');
        setShouldRefretch(true);
      });
  };

  return (
    <Box sx={{ pb: '100px', mx: 'auto' }}>
      <Box
        sx={{
          border: 'solid 1px black',
          borderRadius: '12px',
          width: '250px',
          m: '10px',
          p: '30px',
        }}
      >
        <Typography sx={{ m: '3px' }}>New Slot</Typography>
        <TextField
          disabled={isCreating}
          value={newSlotDate}
          onChange={(e: any) => setNewSlotDate(e.target.value)}
          fullWidth
          sx={{ marginTop: 2 }}
          placeholder="Format: YYYY-MM-DD"
        />
        <TextField
          disabled={isCreating}
          value={newSlotHour}
          onChange={(e: any) => setNewSlotHour(e.target.value)}
          fullWidth
          sx={{ marginTop: 2 }}
          InputProps={{
            inputProps: {
              min: 0,
              max: 23,
            },
          }}
          placeholder="Format (24H): 0 - 23"
          type="number"
        />
        <Button
          disabled={isCreating}
          onClick={handleAddSlot}
          variant="contained"
          sx={{
            p: '10px',
            mt: '12px',
            borderRadius: '10px',
          }}
        >
          Add Slot
        </Button>
        {isCreating && <CircularProgress />}
      </Box>
      <Box sx={{ m: '10px', mt: '30px' }}>
        <Box sx={{ m: '10px', fontWeight: '500', fontSize: '18px' }}>
          Past Slots
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {isPastSlotLoading && <CircularProgress />}
          {!isPastSlotLoading && pastSlots.length == 0 && (
            <Typography sx={{ m: '10px' }}>No slots in the past</Typography>
          )}
          {!isPastSlotLoading &&
            pastSlots.map((slot: any) => (
              <Slot key={slot.id} slot={slot} coachId={coachId} />
            ))}
        </Box>
      </Box>
      <Box sx={{ m: '10px' }}>
        <Box sx={{ m: '10px', fontWeight: '500', fontSize: '18px' }}>
          Upcoming Slots
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {isUpcomingLoading && <CircularProgress />}
          {!isUpcomingLoading && upcomingSlots.length == 0 && (
            <Typography sx={{ m: '10px' }}>No upcoming slots</Typography>
          )}
          {!isUpcomingLoading &&
            upcomingSlots.map((slot: any) => (
              <Slot key={slot.id} slot={slot} coachId={coachId} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CoachViewSlots;
