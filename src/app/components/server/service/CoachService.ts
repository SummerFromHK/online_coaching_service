import {
  createSlotByCoachId,
  getSlotsByCoachId,
} from '../repository/CoachRepository';

export const getSlots = async (
  coachId: number,
  from: string | null,
  to: string | null,
) => {
  return await getSlotsByCoachId(coachId, from, to);
};
export const createSlot = async (coachId: number, startTime: string) =>
  await createSlotByCoachId(coachId, startTime);
