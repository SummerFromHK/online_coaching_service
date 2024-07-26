import { RowDataPacket } from 'mysql2';
import { pool } from '../dbConnection/ConnectionPoolGetter';

export const getSlotsByStudentId = async (
  studentId: number,
  from?: string | null,
  isBookedByStudent?: boolean | null,
) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
      select
        stu.id as studentId,
        s.id as id,
        s.startTime as startTime,
        stu.phoneNumber as studentNumber,
        c.phoneNumber as coachNumber,
        concat(c.firstName, ' ', c.lastName) as hostedBy,
        concat(stu.firstName, ' ', stu.lastName) as bookedBy
      from Student stu join StudentBooksSlot sbs on sbs.studentId = stu.id join Slot s on s.id = sbs.slotId join CoachHasSlot chs on chs.slotId = s.id join Coach c on c.id = chs.coachId
      where stu.id = ?
      ${from ? ' AND s.startTime >= ? ' : ''}
      ${isBookedByStudent ? ' AND sbs.studentId = ? ' : ''}
      order by s.startTime;
    `,
    [studentId, from, studentId].filter(Boolean),
  );

  return rows;
};

export const bookSlotByStudentId = async (
  studentId: number,
  slotId: number,
) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `insert into StudentBooksSlot (slotId, studentId)
     values (?, ?)`,
    [slotId, studentId],
  );

  return rows;
};
