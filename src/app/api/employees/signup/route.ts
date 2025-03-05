import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
connect();
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Check for missing fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 403 }
      );
    }

    // Check for password mismatch
    if (password !== confirmPassword) {
      return Response.json(
        {
          message: "Passwords do not match!",
          success: false,
        },
        { status: 403 }
      );
    }

    // Validate password length
    const passwordValidator = /^.{4,}$/;
    if (!passwordValidator.test(password)) {
      return Response.json(
        {
          message: "Password must be at least 4 characters long",
          success: false,
        },
        { status: 403 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        {
          message: "User already exists!",
          success: false,
        },
        { status: 403 }
      );
    }

    const user = await User.create({ name, email, password });

    // const user = await Admin.create({name:"manager", email:"manager@mail.com",password, role:"admin"})

    return Response.json(
      {
        message: "User created successfully",
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      success: false,
    });
  }
}
