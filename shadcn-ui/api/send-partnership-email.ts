import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, organization, role, website, partnership_type, message } = req.body;

    const response = await resend.emails.send({
      from: 'ProofMode <proofmodepro365@gmail.com>',
      to: 'proofmodepro365@gmail.com',
      subject: 'New Partnership Inquiry',
      reply_to: email,
      html: `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Website:</strong> ${website || 'N/A'}</p>
        <p><strong>Type:</strong> ${partnership_type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Resend response:', response);

    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Email failed' });
  }
}
