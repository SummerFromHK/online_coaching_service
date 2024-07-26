import { getSlots } from '../repository/SlotRepository';

export const getAllSlots = async (from?: string | null) => {
  return await getSlots(from);
};
