import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  if (!req.cookies.has("_uid")) {
    response.cookies.set("_uid", uuidv4(), {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
  }

  return response;
}
