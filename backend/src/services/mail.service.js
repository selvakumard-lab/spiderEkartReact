


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ⭐ THIS FUNCTION NAME MUST MATCH
const sendOtpMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Spider Ekart" <${process.env.MAIL_USER}>`,
      to: to,
      subject: "Your Login OTP",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Login OTP</title>
        </head>

        <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:40px 0;">
            <tr>
              <td align="center">

                <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.08); overflow:hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff;">
                      <h2 style="margin:0; font-weight:600;">Spider Ekart</h2>
                      <p style="margin:5px 0 0; font-size:13px; opacity:0.9;">Secure Login Verification</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:30px; text-align:center; color:#333;">
                      
                      <h3 style="margin-top:0;">Your One-Time Password</h3>

                      <p style="font-size:14px; color:#555;">
                        Use the verification code below to sign in to your account.
                        This code is valid for <b>5 minutes</b>.
                      </p>

                      <!-- OTP Box -->
                      <div style="
                        display:inline-block;
                        margin:20px 0;
                        padding:15px 30px;
                        font-size:28px;
                        letter-spacing:8px;
                        font-weight:bold;
                        color:#4f46e5;
                        background:#f1f3ff;
                        border-radius:8px;
                      ">
                        ${otp}
                      </div>

                      <p style="font-size:13px; color:#777;">
                        Do not share this code with anyone. Our team will never ask for your OTP.
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#fafafa; padding:18px; text-align:center; font-size:12px; color:#888;">
                      If you didn’t request this login, you can safely ignore this email.<br/>
                      © ${new Date().getFullYear()} Spider Ekart. All rights reserved.
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>`,
    });

    console.log("OTP mail sent");
  } catch (error) {
    console.log("Mail Error:", error);
    throw error;
  }
};

// ⭐ EXPORT LIKE THIS ONLY
module.exports = { sendOtpMail };
