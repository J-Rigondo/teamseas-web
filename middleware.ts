import {NextRequest, NextResponse} from "next/server";
import {refreshFunc} from "./libs/api/auth";
import {setRecoil} from "recoil-nexus";
import {routeAtom} from "./libs/recoil/route";

export async function middleware(request: NextRequest) {
  console.log('==================here is middleware=========================')
  console.log(request.nextUrl)
  console.log(request.url)

  const token = request.cookies?.get('refresh');

  if(!token) {
    return NextResponse.redirect(new URL(`http://localhost:3000/login?url=${request.nextUrl.pathname}`))
  }

  const res = await fetch("http://localhost:4000/auth/refresh", {
    // credentials: 'include', not working because this is api area, not browser
    headers:{
      Cookie: `refresh=${token}`
    }
  });

  const result = await res.json();
  console.log('res',result)

  if(result.statusCode === 401) {
    console.log(request.nextUrl.pathname)

    return NextResponse.redirect(new URL(`http://localhost:3000/login?url=${request.nextUrl.pathname}`))
  }

  return NextResponse.next();

}



export const config = {
  matcher: ['/posts/:id'],
}