import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse) {

  
}
export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/"
  ],
}
export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = request.cookies.get('token');
  const { JWT_SECRET } = process.env;
  console.log('token', token);
  
  if(!!token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url)); 
  }
  if (!token && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}