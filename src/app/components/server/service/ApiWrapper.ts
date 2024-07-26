import { NextResponse } from 'next/server';

//TODO: enhance error type, error message
export const withErrorHandling =
  (handler: any) => async (req: Request, context: any) => {
    try {
      return await handler(req, context);
    } catch (err: any) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status },
      );
    }
  };
