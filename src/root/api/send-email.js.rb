import 'mailjet', 'node-mailjet'

MJ = mailjet.api_connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

export default async def handler(req, res)
  unless req.method == 'POST'
    return res.status(405).json({ error: 'Pouze POST požadavky jsou povoleny.' })
  end

  emails = req.body.emails

  if !emails || !Array.isArray(emails) || emails.length == 0
    return res.status(400).json({ error: 'Chybí seznam e-mailů.' })
  end

  begin
    messages = emails.map() do |email|
      {
        From: { Email: 'melodycheck.info@gmail.com', Name: 'MellodyCheck Info' },
        To: [{ Email: email.to, Name: email.name }],
        Subject: email.subject,
        HTMLPart: email.html,
      }
    end

    request = MJ.post('send', {'version': 'v3.1'})
      .request({ Messages: messages })
    result  = await request

    res.status(200).json({ message: 'E-maily byly odeslány!', result: result.body })
  rescue => error
    res.status(500).json({ error: 'Chyba při odesílání e-mailů',
      details: error.message })
  end
end
