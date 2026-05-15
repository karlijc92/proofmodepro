import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required contact form fields',
      });
    }

    const response = await resend.emails.send({
      from: 'ProofMode <hello@proofmodepro.com>',
      to: 'proofmodepro365@gmail.com',
      reply_to: email,
      subject: 'New Contact Form Message',
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Contact email sent:', response);

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Contact email error:', error);

    return res.status(500).json({
      error: 'Contact email failed',
      details: error?.message || error,
    });
  }
}
