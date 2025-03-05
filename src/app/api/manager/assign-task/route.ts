import User from "@/models/User";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { decodeAdminCookie } from "@/helper/cookieManager";
import { sendMail } from "@/helper/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const token = decodeAdminCookie(request);
    console.log(token);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const { employeeId, task } = await request.json();
    // console.log(JSON.stringify({ employeeId, task }));
    const employee = await User.findById(employeeId);
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found", success: false },
        { status: 404 }
      );
    }
    const assignedTask = await Task.create({ ...task, assignee: employee._id });

    console.log("task assigned successfully");
    await sendMail(
      employee.email,
      "New Task Assigned",
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Task Assigned: ${assignedTask.name}</h2>
          <p style="margin: 0 0 10px;"><strong>Description:</strong></p>
          <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
            ${assignedTask.description}
          </p>
          <p><strong>Created On:</strong> ${new Date(
            assignedTask.createdAt
          ).toLocaleString()}</p>
          <p><strong>Deadline:</strong> ${new Date(
            assignedTask.deadline
          ).toLocaleString()}</p>
          <p style="margin-top: 20px;">
            Please ensure the task is completed before the deadline.
          </p>
          <p style="margin-top: 30px;">Thank you,</p>
          <p><strong>Your Team</strong></p>
        </div>
      `
    );

    // console.log(employee.name);

    // console.log("email sent to " + employee.email);

    return NextResponse.json({ assignedTask, success: true }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);

    return NextResponse.json({ message: (error as Error).message });
  }
}
