import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function decodeUserCookie(request: NextRequest) {
  try {
    const token = request.cookies.get("employee")?.value;

    const decoded = jwt.verify(token!, process.env.TOKEN_SECRET_EMPLOYEE!);
    return decoded;
  } catch (error) {
    console.log(error.message);

    return;
  }
}
export function decodeAdminCookie(request: NextRequest) {
  try {
    const token = request.cookies.get("manager")?.value;
    console.log(process.env.TOKEN_SECRET_MANAGER!);
    
    const decoded = jwt.verify(token!, process.env.TOKEN_SECRET_MANAGER!);
    return decoded;
  } catch (error) {
    console.log(error.message);

    return;
  }
}
