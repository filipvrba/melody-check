import Net from "./net";

class Email {
  static request(candidates) {
    let emails = [];

    for (let candidate of candidates) {
      let confirmLink = `${Email.CONFIRMATION_URL}?candidate_id=${candidate.candidateId}&event_id=${candidate.eventId}#confirm`;
      let rejectionLink = `${Email.CONFIRMATION_URL}?candidate_id=${candidate.candidateId}&event_id=${candidate.eventId}#rejection`;
      let confirmBtnHtml = `<a href='${confirmLink}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;'>Potvrdit účast</a>`;
      let rejectionBtnHtml = `<a href='${rejectionLink}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #dc3545; text-decoration: none; border-radius: 5px;'>Zamítnout účast</a>`;
      let defaultSubject = `Informace o události: ${candidate.eventName}`;
      let eventDate = candidate.eventDate.split("-").reverse().join(". ");
      let defaultMessage = `${`
<!DOCTYPE html>
<html>
  <body>
    <p>Ahoj ${candidate.fullName},</p>
    <p>Byl(a) jste přidán(a) do události <b>${candidate.eventName}</b>, která se koná dne <b>${eventDate}</b>.</p>
    <p>Prosíme, potvrďte svou účast kliknutím na tlačítko níže:</p>
    <div style='display: flex; gap: 10px;'>
      ${confirmBtnHtml}
      ${rejectionBtnHtml}
    </div>
    <p>Děkujeme a těšíme se na Vás!</p>
  </body>
</html>
      `}`;
      let subject = "";
      let rawSubject = candidate.registeredSubject;

      if (rawSubject && rawSubject !== "") {
        subject = rawSubject.replaceAll("FULLNAME", candidate.fullName).replaceAll(
          "EVENTNAME",
          candidate.eventName
        ).replaceAll("EVENTDATE", eventDate)
      } else {
        subject = defaultSubject
      };

      let message = null;
      let rawMessage = candidate.registeredBody;

      if (rawMessage && rawMessage !== "") {
        message = rawMessage.replaceAll("FULLNAME", candidate.fullName).replaceAll(
          "EMAIL",
          candidate.email
        ).replaceAll("EVENTNAME", candidate.eventName).replaceAll(
          "EVENTDATE",
          eventDate
        ).replaceAll("CONFIRMBTN", confirmBtnHtml).replaceAll(
          "REJECTIONBTN",
          rejectionBtnHtml
        )
      } else {
        message = defaultMessage
      };

      let email = {
        to: candidate.email,
        name: candidate.fullName,
        subject: subject.replaceAll("\"", "'"),
        html: message.replaceAll("\"", "'")
      };

      emails.push(email)
    };

    return {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({emails})
    }
  }
};

Email.CONFIRMATION_URL = "https://melody-check.vercel.app/";
window.Email = Email