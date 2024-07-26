import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../dbConnection/ConnectionPoolGetter';

export const getSlotsByCoachId = async (
  coachId: number,
  from?: string | null,
  to?: string | null,
) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
      select c.id as coachId,
        s.id as id, stu.id as studentId,
        s.startTime as startTime,
        c.phoneNumber as coachNumber,
        stu.phoneNumber as studentNumber,
        concat(stu.firstName, " ", stu.lastName) as bookedBy,
        sbs.satisfactionScore as satisfaction,
        sbs.note as note
      from Coach c join CoachHasSlot chs on chs.coachId = c.id join Slot s on s.id = chs.slotId left join StudentBooksSlot sbs on sbs.slotId = s.id left join Student stu on stu.id = sbs.studentId
      where c.id = ?
      ${from ? ' AND s.startTime >= ? ' : ''}
      ${to ? ' AND s.startTime < ? ' : ''}
      order by s.startTime;
    `,
    [coachId, from, to].filter(Boolean),
  );
  return rows;
};

export const createSlotByCoachId = async (
  coachId: number,
  startTime: string,
) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    //creat slot
    let [insertResult] = await connection.execute(
      `insert into Slot(startTime) values (?)`,
      [startTime],
    );

    let affectedRows: number = (insertResult as ResultSetHeader).affectedRows;
    if (affectedRows === 0) {
      throw new Error(`error creating slot for coach ${coachId}`);
    }

    const slotId = (insertResult as ResultSetHeader).insertId;

    //create chs
    [insertResult] = await connection.execute(
      `insert into CoachHasSlot(coachId, slotId)
       values (?,?)`,
      [coachId, slotId],
    );

    affectedRows = (insertResult as ResultSetHeader).affectedRows;
    if (affectedRows === 0) {
      throw new Error(`error adding slot for coach ${coachId}`);
    }

    await connection.commit();
    return true;
  } catch (err) {
    console.log('error occurred during transaction ', err);
    await connection?.rollback();
    connection?.release();
  }
};
