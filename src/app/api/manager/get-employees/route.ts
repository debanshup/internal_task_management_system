import { NextRequest, NextResponse } from "next/server";
import { decodeAdminCookie } from "@/helper/cookieManager";
import User from "@/models/User";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const cookie = decodeAdminCookie(request);
    if (!cookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const query = request.nextUrl.searchParams.get("query");

    let employees;
    if (query) {
      employees = await User.find(
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { role: { $regex: query, $options: "i" } },
          ],
        },
        "name email image_src"
      );
    } else {
      employees = await User.find({}, "name email image_src");
    }

    // const employees = await User.find({}, "name email image_src");
    console.log(employees.length);
    return NextResponse.json(
      { data: employees, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
