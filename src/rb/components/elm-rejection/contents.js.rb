import 'CContentsConfirm', '../elm-confirm/contents'

export default class CContents
  def initialize(parent)
    @parent = parent

    @c_contents_confirm = CContentsConfirm.new(@parent)
  end

  def error_content()
    @c_contents_confirm.error_content()
  end

  def no_informations_content()
    @c_contents_confirm.no_informations_content()
  end

  def rejection_content(candidate_name, event_name)
    return """
<div class='container mt-5'>
  <div class='card'>
    <div class='card-header text-center bg-danger text-white'>
      <h3>Účast zamítnuta</h3>
    </div>
    <div class='card-body'>
      <div class='d-flex justify-content-center mb-4'>
        <i class='bi bi-x-circle-fill' style='font-size: 3rem; color: red;'></i>
      </div>
      
      <h5 class='text-center text-danger'>Vaše účast byla úspěšně zamítnuta.</h5>
      <p class='text-center'>Pokud jste si to rozmysleli, můžete svou účast znovu potvrdit prostřednictvím e-mailu, kde naleznete odpovídající tlačítka.</p>

      <div class='row'>
        <div class='col-12 text-center'>
          <p><strong>Jméno uchazeče:</strong> <span id='candidateName'>#{candidate_name}</span></p>
          <p><strong>Název eventu:</strong> <span id='eventName'>#{event_name}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
    """
  end

  def rejection_again_content(candidate_name, event_name)
    return """
<div class='container mt-5'>
  <div class='card'>
    <div class='card-header text-center bg-danger text-white'>
      <h3>Účast byla zamítnuta</h3>
    </div>
    <div class='card-body'>
      <div class='d-flex justify-content-center mb-4'>
        <i class='bi bi-x-circle-fill' style='font-size: 3rem; color: red;'></i>
      </div>
      
      <h5 class='text-center text-danger'>Vaše účast na následujícím eventu byla zamítnuta.</h5>
      <p class='text-center'>Pokud jste si to rozmysleli, můžete svou účast znovu potvrdit prostřednictvím e-mailu, kde naleznete odpovídající tlačítka.</p>

      <div class='row'>
        <div class='col-12 text-center'>
          <p><strong>Jméno uchazeče:</strong> <span id='candidateName'>#{candidate_name}</span></p>
          <p><strong>Název eventu:</strong> <span id='eventName'>#{event_name}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
    """
  end
end