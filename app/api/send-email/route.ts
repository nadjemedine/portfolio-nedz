import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { fullName, phone, email, serviceType, description } = await req.json();

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'ouassimtahi@gmail.com',
      subject: `طلب مشروع جديد: ${serviceType}`,
      html: `
        <h2>معلومات الطلب الجديد:</h2>
        <p><strong>الاسم بالكامل:</strong> ${fullName}</p>
        <p><strong>رقم الهاتف:</strong> ${phone}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>نوع الخدمة:</strong> ${serviceType}</p>
        <p><strong>وصف المشروع:</strong></p>
        <p>${description}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
