// lib/emails/bgcheckAdmin.ts

export const generateBackgroundCheckEmailHTML = (data: any) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Background Check Submission</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        body {
          background-color: #f5f5f5;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin-bottom: 30px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }
        .section-title {
          background-color: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
          color: #333;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        .section-title i {
          margin-right: 10px;
        }
        .section-content {
          padding: 20px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .info-item {
          margin-bottom: 12px;
        }
        .info-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-value {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        .full-width {
          grid-column: span 2;
        }
        .attachments-info {
          margin-top: 20px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        .attachment-badge {
          display: flex;
          align-items: center;
          padding: 12px;
          background-color: #ffffff;
          border-radius: 6px;
          margin-bottom: 10px;
          border: 1px solid #e0e0e0;
        }
        .attachment-badge:last-child {
          margin-bottom: 0;
        }
        .attachment-icon {
          width: 40px;
          height: 40px;
          background-color: #e3f2fd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          color: #1976d2;
          font-size: 20px;
        }
        .attachment-details {
          flex: 1;
        }
        .attachment-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }
        .attachment-meta {
          font-size: 12px;
          color: #666;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: #fff3cd;
          color: #856404;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer p {
          color: #666;
          font-size: 12px;
        }
        .footer a {
          color: #667eea;
          text-decoration: none;
        }
        .divider {
          height: 1px;
          background-color: #e0e0e0;
          margin: 20px 0;
        }
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: span 1;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>📋 New Background Check Submission</h1>
          <p>Submitted on ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <div style="margin-top: 15px;">
            <span class="status-badge">⏳ Pending Review</span>
          </div>
        </div>

        <div class="content">
          <!-- Personal Information Section -->
          <div class="section">
            <div class="section-title">
              <span>👤 Personal Information</span>
            </div>
            <div class="section-content">
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Full Name</div>
                  <div class="info-value">${data.firstName || "N/A"} ${data.lastName || "N/A"}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Date of Birth</div>
                  <div class="info-value">${data.dob || "N/A"}</div>
                </div>
                <div class="info-item full-width">
                  <div class="info-label">Address</div>
                  <div class="info-value">${data.address || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <div class="section">
            <div class="section-title">
              <span>📞 Contact Information</span>
            </div>
            <div class="section-content">
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">
                    <a href="mailto:${data.email || ""}" style="color: #667eea; text-decoration: none;">
                      ${data.email || "N/A"}
                    </a>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">Phone Number</div>
                  <div class="info-value">
                    <a href="tel:${data.phone || ""}" style="color: #667eea; text-decoration: none;">
                      ${data.phone || "N/A"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Employment Information Section -->
          <div class="section">
            <div class="section-title">
              <span>💼 Employment Information</span>
            </div>
            <div class="section-content">
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Current Employer</div>
                  <div class="info-value">${data.employer || "N/A"}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Job Title</div>
                  <div class="info-value">${data.jobTitle || "N/A"}</div>
                </div>
                <div class="info-item full-width">
                  <div class="info-label">Criminal Record</div>
                  <div class="info-value">${data.criminalRecord || "None provided"}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- References Section -->
          <div class="section">
            <div class="section-title">
              <span>👥 References</span>
            </div>
            <div class="section-content">
              <div style="margin-bottom: 20px;">
                <h4 style="color: #333; margin-bottom: 10px; font-size: 14px;">Reference 1</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Name</div>
                    <div class="info-value">${data.ref1Name || "N/A"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone</div>
                    <div class="info-value">${data.ref1Phone || "N/A"}</div>
                  </div>
                  <div class="info-item full-width">
                    <div class="info-label">Email</div>
                    <div class="info-value">${data.ref1Email || "N/A"}</div>
                  </div>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div>
                <h4 style="color: #333; margin-bottom: 10px; font-size: 14px;">Reference 2</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Name</div>
                    <div class="info-value">${data.ref2Name || "N/A"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone</div>
                    <div class="info-value">${data.ref2Phone || "N/A"}</div>
                  </div>
                  <div class="info-item full-width">
                    <div class="info-label">Email</div>
                    <div class="info-value">${data.ref2Email || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Attachments Information -->
          <div class="attachments-info">
            <h3 style="color: #333; margin-bottom: 15px; font-size: 16px;">📎 Attached Documents</h3>
            
            <div class="attachment-badge">
              <div class="attachment-icon">📄</div>
              <div class="attachment-details">
                <div class="attachment-name">Driver's License - Front</div>
                <div class="attachment-meta">Image file • Attached to this email</div>
              </div>
            </div>
            
            <div class="attachment-badge">
              <div class="attachment-icon">📄</div>
              <div class="attachment-details">
                <div class="attachment-name">Driver's License - Back</div>
                <div class="attachment-meta">Image file • Attached to this email</div>
              </div>
            </div>
            
            <div style="background-color: #e8f5e9; padding: 12px; border-radius: 6px; margin-top: 15px;">
              <p style="color: #2e7d32; font-size: 13px; display: flex; align-items: center; margin: 0;">
                <span style="margin-right: 8px;">✅</span>
                Both files have been attached to this email
              </p>
            </div>
          </div>

          <!-- System Information -->
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div>
                <span style="color: #666; font-size: 12px;">📋 Applicant ID:</span>
                <span style="color: #333; font-size: 12px; font-family: monospace; margin-left: 8px; background: #fff; padding: 2px 6px; border-radius: 4px;">
                  ${data.applicantId || "Pending"}
                </span>
              </div>
              <div>
                <span style="color: #666; font-size: 12px;">🔒 SSN:</span>
                <span style="color: #333; font-size: 12px; font-family: monospace; margin-left: 8px; background: #fff; padding: 2px 6px; border-radius: 4px;">
                  ${data.ssn ? "***-**-" + data.ssn.slice(-4) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p style="margin-bottom: 10px;">
            This is an automated message from <strong>SeekPaneccea Background Check System</strong>.
          </p>
          <p style="color: #666; font-size: 12px; margin-bottom: 15px;">
            The attached documents are included with this email. Please review them at your earliest convenience.
          </p>
          <p style="margin-top: 15px; font-size: 11px; color: #999;">
            © ${new Date().getFullYear()} SeekPaneccea. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateBackgroundCheckText = (data: any) => {
  return `
NEW BACKGROUND CHECK SUBMISSION
═══════════════════════════════════════════════════
Submitted: ${new Date().toLocaleString()}
Status: Pending Review

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${data.firstName || "N/A"} ${data.lastName || "N/A"}
Date of Birth: ${data.dob || "N/A"}
Address: ${data.address || "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: ${data.email || "N/A"}
Phone: ${data.phone || "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EMPLOYMENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Employer: ${data.employer || "N/A"}
Job Title: ${data.jobTitle || "N/A"}
Criminal Record: ${data.criminalRecord || "None provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFERENCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reference 1:
  Name: ${data.ref1Name || "N/A"}
  Phone: ${data.ref1Phone || "N/A"}
  Email: ${data.ref1Email || "N/A"}

Reference 2:
  Name: ${data.ref2Name || "N/A"}
  Phone: ${data.ref2Phone || "N/A"}
  Email: ${data.ref2Email || "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ATTACHMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Driver's License - Front (attached to this email)
✓ Driver's License - Back (attached to this email)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Applicant ID: ${data.applicantId || "Pending"}
SSN: ${data.ssn ? "***-**-" + data.ssn.slice(-4) : "N/A"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated message from SeekPaneccea Background Check System.
The required documents are attached to this email. Please review them at your earliest convenience.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
};
