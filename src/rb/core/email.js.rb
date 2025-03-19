import 'Net', './net'

class Email
  CONFIRMATION_URL = 'https://melody-check.vercel.app/'

  def self.request(candidates)
    emails = []
    candidates.each do |candidate|
      
      confirm_link   = "#{CONFIRMATION_URL}?candidate_id=#{candidate.candidate_id}&event_id=#{candidate.event_id}#confirm"
      rejection_link = "#{CONFIRMATION_URL}?candidate_id=#{candidate.candidate_id}&event_id=#{candidate.event_id}#rejection"

      confirm_btn_html   = "<a href='#{confirm_link}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;'>Potvrdit účast</a>"
      rejection_btn_html = "<a href='#{rejection_link}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #dc3545; text-decoration: none; border-radius: 5px;'>Zamítnout účast</a>"

      default_subject = "Informace o události: #{candidate.event_name}"
      event_date      = candidate.event_date.split('-').reverse().join('. ')

      default_message = """
<!DOCTYPE html>
<html>
  <body>
    <p>Ahoj #{candidate.full_name},</p>
    <p>Byl(a) jste přidán(a) do události <b>#{candidate.event_name}</b>, která se koná dne <b>#{event_date}</b>.</p>
    <p>Prosíme, potvrďte svou účast kliknutím na tlačítko níže:</p>
    <div style='display: flex; gap: 10px;'>
      #{confirm_btn_html}
      #{rejection_btn_html}
    </div>
    <p>Děkujeme a těšíme se na Vás!</p>
  </body>
</html>
      """

      subject = ''
      raw_subject = candidate.registered_subject
      if raw_subject && raw_subject != ''

        subject = raw_subject
        .gsub('FULLNAME',   candidate.full_name)
        .gsub('EVENTNAME',  candidate.event_name)
        .gsub('EVENTDATE',  event_date)
      else
        subject = default_subject
      end

      message = nil
      raw_message = candidate.registered_body
      if raw_message && raw_message != ''
        
        message = raw_message
        .gsub('FULLNAME',     candidate.full_name)
        .gsub('EMAIL',        candidate.email)
        .gsub('EVENTNAME',    candidate.event_name)
        .gsub('EVENTDATE',    event_date)
        .gsub('CONFIRMBTN',   confirm_btn_html)
        .gsub('REJECTIONBTN', rejection_btn_html)
      else
        message = default_message
      end

      email = {
        to: candidate.email,
        name: candidate.full_name,
        subject: subject.gsub("\"", "\'"),
        html: message.gsub("\"", "\'"),
      }

      emails.push(email)
    end

    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: emails
      })
    }
  end

  def self.send(candidates, &callback)
    fetch('/api/send-email', Email.request(candidates))
    .then(lambda do |response|
      response.json()
    end)
    .then(lambda do |obj|
      callback(obj) if callback
    end)
  end
end
window.Email = Email