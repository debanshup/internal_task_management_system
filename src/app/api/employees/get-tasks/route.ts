import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import { decodeUserCookie } from "@/helper/cookieManager";
import mongoose from "mongoose";
import User from "@/models/User";
import { JwtPayload } from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = decodeUserCookie(request) as JwtPayload;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const filter = request.nextUrl.searchParams.get("filter") as
      | "all"
      | "pending"
      | "in-progress"
      | "completed"
      | null;
    const sort = request.nextUrl.searchParams.get("sort") as
      | "new-to-old"
      | "old-to-new"
      | null;

    // console.log(token.id);

    const validStatuses = ["all", "pending", "in-progress", "completed"];
    console.log(filter);
    console.log(sort);

    if (filter === null || !validStatuses.includes(filter)) {
      console.log("YES");

      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    const sortOptions: { [key: string]: { createdAt: mongoose.SortOrder } } = {
      "new-to-old": { createdAt: -1 },
      "old-to-new": { createdAt: 1 },
    };

    const sortOrder = sort ? sortOptions[sort] : sortOptions["new-to-old"];

    const employeeObjectId = new mongoose.Types.ObjectId((token.id) as string);

    // console.log(typeof (token.id)) ;
    const user = await User.findById(token.id).select("name")
    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
      
    }
    

    const tasks = await Task.find(
      filter === "all"
        ? { assignee: employeeObjectId }
        : { assignee: employeeObjectId, status: filter }
    ).sort(sortOrder);

    console.log(tasks.length);
    return NextResponse.json({ tasks, name: user.name, success: true }, { status: 200 });
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "Unknown error occurred"
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
