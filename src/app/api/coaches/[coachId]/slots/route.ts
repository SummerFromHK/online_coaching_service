import { withErrorHandling } from '@/app/components/server/service/ApiWrapper';
import {
  createSlot,
  getSlots,
} from '@/app/components/server/service/CoachService';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withErrorHandling(
  async (req: NextRequest, { params }: { params: { coachId: string } }) => {
    const to = req.nextUrl.searchParams.get('to');
    const from = req.nextUrl.searchParams.get('from');
    const slots = await getSlots(Number(params.coachId), from, to);
    return NextResponse.json(slots);
  },
);

export const POST = withErrorHandling(
  async (req: Request, { params }: { params: { coachId: string } }) => {
    const body: any = await req.json();
    const { startTime } = body;
    await createSlot(Number(params.coachId), startTime);
    return Response.json({}, { status: 203 });
  },
);
