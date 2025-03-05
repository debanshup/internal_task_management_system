import fs from "fs";
import path from "path";

const logFilePath = "D://internship/dc_infotech/projects/week_3/internal_task_management_system/src/logs/email.log"

export function logError(email: any, subject: any, emailContent: any, errorMessage: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] Failed to send email to: ${email}
  Subject: ${subject}
  Error: ${errorMessage}
  
  Email Content:
  ${emailContent}
  
  -----------------------------\n`;
  if (fs.existsSync(logFilePath)) {
    // Append to the existing file
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) console.error("Failed to append to log file:", err.message);
      return;
    });
  } else {
    // Create the file and append the log
    fs.writeFile(logFilePath, logMessage, (err) => {
      if (err) console.error("Failed to create log file:", err.message);
      return;
    });
  }
  console.error("Failed to send email. Check the log file at: ", logFilePath);
}
