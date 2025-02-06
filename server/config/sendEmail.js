import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config(); 

if (process.env.RESEND_API) {
  console.log("provide the resend_api inside the .env file");
}

const resend = new Resend(process.env.RESEND_API);

// Send email function to the server and send it to the endpoint of the resend API
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Blinkit <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) { 
      return console.error({ error });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};


export default sendEmail;