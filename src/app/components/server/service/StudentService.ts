import moment from 'moment';
import {
  bookSlotByStudentId,
  getSlotsByStudentId,
} from '../repository/StudentRepository';
import { getAllSlots } from './SlotService';

export const getSlots = async (
  studentId: number,
  from?: string | null,
  isBookedByStudent?: boolean | null,
) => {
  if (Boolean(isBookedByStudent)) {
    return await getSlotsByStudentId(studentId, from, isBookedByStudent);
  } else {
    return await getBookableSlots(studentId, from, isBookedByStudent);
  }
};

export const bookSlot = async (studentId: number, slotId: number) => {
  return await bookSlotByStudentId(studentId, slotId);
};

const getBookableSlots = async (
  studentId: number,
  from?: string | null,
  isBookedByStudent?: boolean | null,
) => {
  //get all upcoming slots AND get all student's booked slots
  //filter out upcoming slots that overlaps with any of the booked slots
  const upcomingSlots = await getAllSlots(from);
  const bookedSlots = await getSlotsByStudentId(
    studentId,
    from,
    isBookedByStudent,
  );

  //for each upcomingSlot (s1)
  const bookableSlotsWithoutConflict = upcomingSlots.filter(
    (upcomingSlot: any) => {
      const upcomingSlotStartTime = moment(upcomingSlot.startTime);
      const upcomingSlotEndTime = moment(upcomingSlot.startTime).add(
        2,
        'hours',
      );

      //check if (s1) overlaps with any 1 of the bookedSlot (s2)
      const overlapFound = bookedSlots.find((bookedSlot: any) => {
        const bookedSlotStartTime = moment(bookedSlot.startTime);
        const bookedSlotEndTime = moment(bookedSlot.startTime).add(2, 'hours');

        return !(
          bookedSlotEndTime.isSameOrBefore(upcomingSlotStartTime) ||
          upcomingSlotEndTime.isSameOrBefore(bookedSlotStartTime)
        );
      });
      return !Boolean(overlapFound);
    },
  );
  return bookableSlotsWithoutConflict; //return list of bookable slots with no conflicts
};
