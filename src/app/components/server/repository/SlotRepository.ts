import { RowDataPacket } from 'mysql2';
import { pool } from '../dbConnection/ConnectionPoolGetter';

export const getSlots = async (from?: string | null) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
     select
      s.id as id,
      c.id as coachId,
      stu.id as studentId,
      s.startTime as startTime,
      stu.phoneNumber as studentNumber,
      c.phoneNumber as coachNumber,
      concat(stu.firstName, ' ', stu.lastName)
      as bookedBy, concat(c.firstName, ' ',
      c.lastName) as hostedBy
     from Slot s join CoachHasSlot chs on chs.slotId = s.id join Coach c on chs.coachId = c.id left join StudentBooksSlot sbs on sbs.slotId = s.id left join Student stu on stu.id = sbs.studentId
     ${from ? 'where s.startTime >= ? ' : ''}
     order by s.startTime;
    `,
    [from],
  );
  return rows;
};
