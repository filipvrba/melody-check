import 'mailjet', 'node-mailjet'

MJ = mailjet.connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

export default async def handler(req, res)
  if req.method == 'POST'
    to      = req.body.to
    subject = req.body.subject
    text    = req.body.text
    html    = req.body.html

    begin
      request = MJ.post('send').request({
        From: { Email: 'melodycheck.info@gmail.com', Name: 'MelodyCheck' },
        To: [{ Email: to }],
        Subject: subject,
        TextPart: text,
        HTMLPart: html,
      })

      result = await request

      res.status(200).json({ message: 'The email has been sent!', result: result })

    rescue => error
      res.status(500).json({ error: 'Error when sending an email', details: error.message })
    end
  else
    res.status(405).json({ error: 'Only POST requests are allowed.' })
  end
end
