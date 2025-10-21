// Simple console email mock. Replace with nodemailer in prod.
const sendEmail = async ({ to, subject, text }) => {
  console.log('---EMAIL SENT---');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Text:', text);
  console.log('----------------');
  return true;
};

module.exports = { sendEmail };
