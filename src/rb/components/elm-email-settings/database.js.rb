import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def set_email_templates(options, &callback)
    query = "INSERT OR REPLACE INTO email_templates (event_id, registered_subject, registered_body, unconfirmed_subject, unconfirmed_body) " +
            "VALUES (#{@parent.event_id}, '#{options.registered.subject.encode_base64()}', '#{options.registered.html.encode_base64()}', " +
            "'#{options.unconfirmed.subject.encode_base64()}', '#{options.unconfirmed.html.encode_base64()}');"

    @parent.c_inputs.set_disable(true)
    Net.bef(query) do |message|
      @parent.c_inputs.set_disable(false)

      is_set = Array.is_array(message)
      callback(is_set) if callback
    end
  end

  def get_email_templates(&callback)
    query = "SELECT registered_subject, registered_body, " +
            "unconfirmed_subject, unconfirmed_body FROM " +
            "email_templates WHERE event_id = #{@parent.event_id};"

    @parent.c_inputs.set_disable(true)
    Net.bef(query) do |rows|
      @parent.c_inputs.set_disable(false)

      if rows.length > 0
        decode_templates = rows.map do |h|
          {
            registered:  {
              subject: h['registered_subject'].decode_base64(),
              html:    h['registered_body'].decode_base64()
            },
            unconfirmed: {
              subject: h['unconfirmed_subject'].decode_base64(),
              html:    h['unconfirmed_body'].decode_base64()
            }
          }
        end
        callback(decode_templates[0]) if callback
      else
        callback(nil) if callback
      end
    end
  end
end