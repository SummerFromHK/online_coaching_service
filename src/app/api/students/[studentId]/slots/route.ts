import { withErrorHandling } from '@/app/components/server/service/ApiWrapper';
import {
  bookSlot,
  getSlots,
} from '@/app/components/server/service/StudentService';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withErrorHandling(
  async (req: NextRequest, { params }: { params: { studentId: string } }) => {
    const from = req.nextUrl.searchParams.get('from');
    const isBookedByStudent = req.nextUrl.searchParams.get('isBookedByStudent');

    const slots = await getSlots(
      Number(params.studentId),
      from,
      Boolean(isBookedByStudent),
    );

    return NextResponse.json(slots);
  },
);

export const POST = withErrorHandling(
  async (req: Request, { params }: { params: { studentId: string } }) => {
    const body = await req.json();
    const { slotId } = body;
    await bookSlot(Number(params.studentId), Number(slotId));
    return Response.json({}, { status: 203 });
  },
);
