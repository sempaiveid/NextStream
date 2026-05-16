export function resetPasswordTemplate(email: string, resetLink: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password – NextStream</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      background-color: #0a0a0a;
    }
    .outer {
      background-color: #0a0a0a;
      padding: 24px 12px;
      width: 100%;
      box-sizing: border-box;
    }
    .card {
      max-width: 440px;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(0,0,0,0.7);
      margin: 0 auto;
    }
    .header {
      background: linear-gradient(150deg, #1a0000 0%, #e50914 55%, #ff5f5f 100%);
      padding: 28px 24px 24px;
      text-align: center;
    }
    .body-cell {
      background: #141414;
      padding: 28px 24px 24px;
    }
    .warning-cell {
      background: #1a1a1a;
      padding: 14px 24px;
      border-top: 1px solid #222;
    }
    .footer-cell {
      background: #0f0f0f;
      padding: 18px 24px;
      text-align: center;
      border-top: 1px solid #1a1a1a;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #e50914, #c40812);
      color: #ffffff !important;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      padding: 13px 40px;
      border-radius: 7px;
      letter-spacing: 0.3px;
      box-shadow: 0 4px 20px rgba(229, 9, 20, 0.4);
    }
    .fallback-link {
      color: #e50914;
      font-size: 10px;
      word-break: break-all;
      overflow-wrap: anywhere;
      text-decoration: none;
    }
    @media only screen and (max-width: 480px) {
      .outer  { padding: 12px 8px !important; }
      .header { padding: 22px 16px 20px !important; }
      .body-cell { padding: 22px 16px 20px !important; }
      .warning-cell { padding: 12px 16px !important; }
      .footer-cell  { padding: 16px !important; }
      .btn {
        display: block !important;
        padding: 13px 20px !important;
        text-align: center;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body>

  <div class="outer">
    <div class="card">

      <!-- Header -->
      <div class="header">
        <div style="display:inline-block;width:44px;height:44px;
                     background:rgba(255,255,255,0.15);border-radius:50%;
                     line-height:44px;font-size:22px;margin-bottom:10px;">
          🎬
        </div>
        <div style="color:#ffffff;font-size:22px;font-weight:800;
                     letter-spacing:-0.5px;line-height:1;">
          Next<span style="color:rgba(255,255,255,0.65);">Stream</span>
        </div>
        <div style="margin-top:3px;color:rgba(255,255,255,0.5);
                     font-size:9px;letter-spacing:3px;text-transform:uppercase;">
          Watch Without Limits
        </div>
      </div>

      <!-- Body -->
      <div class="body-cell">

        <!-- Key icon -->
        <div style="text-align:center;padding-bottom:18px;">
          <div style="display:inline-block;width:56px;height:56px;
                       background:linear-gradient(135deg,#1f1f1f,#2a2a2a);
                       border-radius:50%;border:2px solid #2e2e2e;
                       line-height:56px;font-size:26px;text-align:center;">
            🔑
          </div>
        </div>

        <!-- Heading -->
        <h1 style="margin:0 0 8px;color:#ffffff;font-size:19px;
                    font-weight:700;text-align:center;line-height:1.3;">
          Reset Your Password
        </h1>

        <!-- Subtext -->
        <p style="margin:0 0 20px;color:#888888;font-size:13px;
                    line-height:1.7;text-align:center;">
          We received a request to reset the password for<br/>
          <span style="color:#cccccc;font-weight:600;">${email}</span>
        </p>

        <!-- Divider -->
        <div style="height:1px;background:linear-gradient(90deg,transparent,#2e2e2e,transparent);
                     margin:0 0 20px;"></div>

        <!-- CTA Button -->
        <div style="text-align:center;margin-bottom:20px;">
          <a href="${resetLink}" class="btn">Reset Password</a>
        </div>

        <!-- Timer badge -->
        <div style="text-align:center;margin-bottom:20px;">
          <div style="display:inline-block;background:#1f1f1f;
                       border:1px solid #2a2a2a;border-radius:5px;
                       padding:8px 16px;color:#aaaaaa;font-size:12px;">
            ⏳&nbsp; This link expires in&nbsp;
            <span style="color:#e50914;font-weight:700;">1 hour</span>
          </div>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:linear-gradient(90deg,transparent,#2e2e2e,transparent);
                     margin:0 0 18px;"></div>

        <!-- Fallback URL -->
        <p style="margin:0 0 4px;color:#555555;font-size:11px;text-align:center;">
          Button not working? Copy and paste this link:
        </p>
        <p style="margin:0;text-align:center;">
          <a href="${resetLink}" class="fallback-link">${resetLink}</a>
        </p>

      </div>

      <!-- Warning -->
      <div class="warning-cell">
        <p style="margin:0;color:#555555;font-size:11px;
                    line-height:1.6;text-align:center;">
          If you didn't request a password reset, you can safely ignore this email.
          Your password will remain unchanged.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer-cell">
        <p style="margin:0 0 4px;color:#e50914;font-size:13px;font-weight:700;">
          NextStream
        </p>
        <p style="margin:0 0 10px;color:#444444;font-size:10px;">
          © ${new Date().getFullYear()} NextStream. All rights reserved.
        </p>
        <div style="height:2px;width:28px;
                     background:linear-gradient(90deg,#e50914,transparent);
                     margin:0 auto;border-radius:2px;"></div>
      </div>

    </div>
  </div>

</body>
</html>`;
}
