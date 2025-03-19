export default class CContents
  def initialize(parent)
    @parent = parent

    @input_full_name = @parent.query_selector('#eventCandidateModaFullName')
    @input_email     = @parent.query_selector('#eventCandidateModaEmail')
  end

  def set_inputs(candidate)
    @input_full_name.value = candidate.full_name
    @input_email.value     = candidate.email
  end
end