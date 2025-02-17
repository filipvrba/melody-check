import 'Net', '../../core/net'

export default class CDatabase
  def initialize(parent)
    @parent = parent
  end

  def add_date_with_time(options, &callback)
    query = "INSERT INTO candidate_arrival_times " +
            "(candidate_id, event_id, arrival_date, arrival_time) " +
            "VALUES (#{@parent.candidate_id}, #{@parent.event_id}, " +
            "'#{options.date}', '#{options.time}');"

    @parent.set_visible_spinner(true) if @parent.set_visible_spinner
    Net.bef(query) do |message|
      @parent.set_visible_spinner(false) if @parent.set_visible_spinner
      callback(message) if callback
    end
  end

  def get_date_with_time(&callback)
    query = "SELECT id, arrival_date, arrival_time " +
            "FROM candidate_arrival_times " +
            "WHERE candidate_id = #{@parent.candidate_id} AND event_id = #{@parent.event_id} " +
            "ORDER BY arrival_date DESC, arrival_time DESC;"
    
    @parent.set_visible_spinner(true) if @parent.set_visible_spinner
    Net.bef(query) do |rows|
      @parent.set_visible_spinner(false) if @parent.set_visible_spinner
      if rows
        callback(rows) if callback
      end
    end
  end

  def remove_row(id, &callback)
    query = "DELETE FROM candidate_arrival_times WHERE id = #{id};"

    @parent.set_visible_spinner(true) if @parent.set_visible_spinner
    Net.bef(query) do |message|
      @parent.set_visible_spinner(false) if @parent.set_visible_spinner
      callback(message) if message
    end
  end
end