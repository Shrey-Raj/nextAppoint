// import { NextResponse } from 'next/server';
// import { getSession } from './app/_utils/lib';   
// import ToastMessage from './components/ui/ToastMessage';

export async function middleware(req) {
//   const session = await getSession();
//   const { pathname } = req.nextUrl;

//   // Define paths that do not require authentication
//   const publicPaths = ['/login', '/signup', '/'];

//   // If the user is not logged in and tries to access a protected route
//   if (!session && !publicPaths.includes(pathname)) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   // If the user is logged in and tries to access login or signup
//   if (session && (pathname === '/login' || pathname === '/signup')) {
//     ToastMessage('You need to logout first!'); 
//     return NextResponse.redirect(new URL('/', req.url)); // Redirect to homepage or dashboard
//   }

//   // Continue with the request
//   return NextResponse.next();
}

// // Specify the paths where this middleware should run
// export const config = {
//   matcher: [
//     '/:path*', // Example: Protect dashboard routes
//     '/login',            // Apply to login page
//     '/signup',           // Apply to signup page
//     '/',                 // Apply to the homepage
//   ],
// };
