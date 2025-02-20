import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {}
export const config = {
    matcher: ["/login", "/dashboard", "/api/add_datapoint_timer", "/api/get_datapoint_timers", "/api/delete_datapoint_timer"],
};
export async function middleware(request: NextRequest) {
    const { pathname }: { pathname: string } = request.nextUrl;
    const token = request.cookies.get("token");
    const response = await fetch(`${request.nextUrl.origin}/api/authenticate`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token?.value}` },
    });
    await response.json();
    
    if (response.ok && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else if (!response.ok) {
        if (pathname !== "/login") {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
    }
}
