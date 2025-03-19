import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def get_event_details(&callback)
    query = "SELECT id, event_name, event_date FROM events " +
            "WHERE user_id = #{@parent.user_id} ORDER BY created_at ASC;"

    @parent.c_spinner.set_display_with_id(true, '#spinnerOne') if @parent.c_spinner
    Net.bef(query) do |rows|
      @parent.c_spinner.set_display_with_id(false, '#spinnerOne') if @parent.c_spinner

      have_event = rows.length > 0
      if have_event
        decode_rows = rows.map do |h|
          {
            id:   h.id,
            name: h['event_name'].decode_base64(),
            date: h['event_date'].decode_base64(),
          }
        end

        callback(decode_rows) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def set_event_details(title, date, &callback)
    event_name = title.encode_base64()
    event_date = date.encode_base64()
    event_id   = @parent.event_id || 'NULL'

    query = "INSERT INTO events (id, user_id, event_name, event_date) " +
            "VALUES (#{event_id}, #{@parent.user_id}, '#{event_name}', '#{event_date}') " +
            "ON CONFLICT(id) DO UPDATE " +
            "SET event_name = excluded.event_name, event_date = excluded.event_date;"

    @parent.c_spinner.set_display_with_id(true, '#spinnerOne')
    Net.bef(query) do |message|
      @parent.c_spinner.set_display_with_id(false, '#spinnerOne')

      callback(message) if callback
    end
  end

  def add_candidate(full_name, email, &callback)
    @parent.c_spinner.set_display_with_id(true, '#spinnerTwo')

    encode_full_name = full_name.encode_base64()
    encode_email     = email.encode_base64()

    query_add_candidate = "INSERT INTO candidates (full_name, email, event_id) " +
                          "VALUES ('#{encode_full_name}', '#{encode_email}', #{@parent.event_id});"

    Net.bef(query_add_candidate) do |message|
      @parent.c_spinner.set_display_with_id(false, '#spinnerTwo')

      if message
        callback('tADDED') if callback
      else
        callback('tNOADDED') if callback
      end
    end

  end

  def get_candidates(&callback)
    @parent.c_spinner.set_display_with_id(true, '#spinnerTwo')

    query = "SELECT id, full_name, email FROM candidates WHERE event_id = #{@parent.event_id};"

    Net.bef(query) do |rows|
      @parent.c_spinner.set_display_with_id(false, '#spinnerTwo')

      have_candidates = rows.length > 0
      if have_candidates
        decode_rows = rows.map do |h|
          return {
            id: h.id,
            full_name: h['full_name'].decode_base64(),
            email: h.email.decode_base64(),
          }
        end

        callback(decode_rows) if callback
      else
        callback([]) if callback
      end
    end

  end

  def remove_candidate(candidate_id, &callback)
    query = "DELETE FROM candidates WHERE id = #{candidate_id};"

    @parent.c_spinner.set_display_with_id(true, '#spinnerTwo')
    Net.bef(query) do |message|
      @parent.c_spinner.set_display_with_id(false, '#spinnerTwo')

      callback(message) if callback
    end
  end

  def remove_email_logs(id_candidates, &callback)
    unless id_candidates.length > 0
      return
    end

    query = "DELETE FROM email_logs WHERE candidate_id IN (#{id_candidates.join(', ')});"

    @parent.c_spinner.set_display_with_id(true, '#spinnerTwo')
    Net.bef(query) do |message|
      @parent.c_spinner.set_display_with_id(false, '#spinnerTwo')

      callback(message) if callback
    end
  end

  def email_candidates(id_candidates, &callback)
    unless id_candidates.length > 0
      return
    end

    query = "SELECT 
  c.id AS candidate_id, 
  c.email, 
  c.full_name, 
  e.id AS event_id, 
  e.event_name, 
  e.event_date,
  et.registered_subject,
  et.registered_body
FROM candidates c
JOIN events e 
  ON c.event_id = e.id
LEFT JOIN email_templates et 
  ON e.id = et.event_id 
WHERE c.id IN (#{id_candidates.join(', ')});"

    Net.bef(query) do |rows|
      have_rows = rows && rows.length > 0

      if have_rows
        result = rows.map do |h|
          {
            candidate_id: h['candidate_id'].to_i,
            email: h.email.decode_base64(),
            full_name: h['full_name'].decode_base64(),
            event_id: h['event_id'].to_i,
            event_name: h['event_name'].decode_base64(),
            event_date: h['event_date'].decode_base64(),
            registered_subject: h['registered_subject'].decode_base64(),
            registered_body: h['registered_body'].decode_base64(),
          }
        end

        callback(result) if callback
      else
        callback(nil) if callback
      end
    end
  end
end