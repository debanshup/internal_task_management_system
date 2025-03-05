import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import  jwt from 'jsonwebtoken'
import Admin from "@/models/Admin";
connect();
export async function POST(request: NextRequest) {
  try {
    const { role, email, password } = await request.json();
    const user = await Admin.findOne({ email, role });

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        {
          message: "Invalid credentials, user not found or password mismatch.",
          success: false,
        },
        { status: 404 }
      );
    }

    const response= NextResponse.json(
      {
        message: "logged in successfully",
        success: true,
      },
      { status: 200 }
    );
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET_MANAGER!, {
      expiresIn: "1d",
    });

    // console.log(token);

    response.cookies.set("manager", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return response

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
