import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import { decodeAdminCookie } from "@/helper/cookieManager";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

connect();
export async function GET(request: NextRequest) {
  try {
    // console.log("HI");

    const token = decodeAdminCookie(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const employeeId = request.nextUrl.searchParams.get("employeeId");
    // console.log(employeeId);

    if (!employeeId) {
      return NextResponse.json(
        { message: "Employee ID is required" },
        { status: 400 }
      );
    }
    const filter = request.nextUrl.searchParams.get("filter");
    const sort = request.nextUrl.searchParams.get("sort") as
      | "new-to-old"
      | "old-to-new"
      | null;

    // console.log(filter);

    const validStatuses = ["all", "pending", "in-progress", "completed"];
    if (filter === null || !validStatuses.includes(filter)) {
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

    // console.log(filter);

    const employeeObjectId = new mongoose.Types.ObjectId(employeeId);

    const tasks = await Task.find(
      filter === "all"
        ? { assignee: employeeObjectId }
        : { assignee: employeeObjectId, status: filter }
    ).sort(sortOrder);

    console.log(tasks.length);
    return NextResponse.json({ tasks, success: true }, { status: 200 });
  } catch (error: unknown) {
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
