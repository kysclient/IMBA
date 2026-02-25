import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: "IMBA <onboarding@resend.dev>",
    to,
    subject: "[IMBA] 비밀번호 재설정 안내",
    html: `
      <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 0;">
        <div style="background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
          <!-- Header -->
          <div style="padding: 32px 32px 24px; border-bottom: 1px solid #f3f4f6;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 600; color: #1f1f1f;">비밀번호 재설정</h2>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 20px;">
              안녕하세요, <strong>${name}</strong>님.
            </p>
            <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 28px;">
              비밀번호 재설정을 요청하셨습니다.<br/>
              아래 버튼을 클릭하여 새 비밀번호를 설정해주세요.
            </p>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="display: inline-block; background-color: #0b57d0; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 40px; border-radius: 100px;">
                비밀번호 재설정
              </a>
            </div>

            <p style="font-size: 13px; color: #9ca3af; line-height: 1.6; margin: 24px 0 0;">
              이 링크는 <strong>15분</strong> 후 만료됩니다.<br/>
              본인이 요청하지 않은 경우 이 이메일을 무시해주세요.
            </p>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 32px; background: #f9fafb; border-top: 1px solid #f3f4f6;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0; text-align: center;">
              &copy; IMBA 국제메디컬뷰티협회
            </p>
          </div>
        </div>
      </div>
    `,
  });
}
