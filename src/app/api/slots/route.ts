import { withErrorHandling } from '@/app/components/server/service/ApiWrapper';
import { getAllSlots } from '@/app/components/server/service/SlotService';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withErrorHandling(
  async (req: NextRequest, { params }: { params: {} }) => {
    const from = req.nextUrl.searchParams.get('from');
    const slots = await getAllSlots(from);
    return NextResponse.json(slots);
  },
);
