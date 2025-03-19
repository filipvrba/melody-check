import mailjet from "node-mailjet";

const MJ = mailjet.connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

export default async function handler(req, res) {
  let to, subject, text, html;

  if (req.method === "POST") {
    to = req.body.to;
    subject = req.body.subject;
    text = req.body.text;
    html = req.body.html;

    try {
      let request = MJ.post("send").request({
        From: {Email: "melodycheck.info@gmail.com", Name: "MelodyCheck"},
        To: [{Email: to}],
        Subject: subject,
        TextPart: text,
        HTMLPart: html
      });

      let result = await(request);
      res.status(200).json({message: "The email has been sent!", result})
    } catch (error) {
      res.status(500).json({
        error: "Error when sending an email",
        details: error.message
      })
    }
  } else {
    return res.status(405).json({error: "Only POST requests are allowed."})
  }
}