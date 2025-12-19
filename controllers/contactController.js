const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// EMAIL VALIDATION
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Email & Message are required.",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    await resend.emails.send({
      from: "Centanni Contact <onboarding@resend.dev>",
      to: ["designcentanni@gmail.com"],
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
};
