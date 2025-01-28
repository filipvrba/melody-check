export default class ElmDashboardInformation < HTMLElement
  def initialize
    super
    
    init_elm()

    window.dashboard_information_btn_click = btn_click
  end

  def btn_click()
    URLParams.set('sc-index', 0)
    location.hash = 'settings'
  end

  def init_elm()
    template = """
<div class='d-flex justify-content-center align-items-center' style='height: calc(100vh - 56px);'>
  <div class='text-center'>
    <i class='bi bi-exclamation-circle-fill display-1 text-warning'></i>
    <h1 class='mt-3'>Chybí potřebné informace</h1>
    <p class='text-muted'>Pro vytvoření koncertní události musíte nastavit všechny potřebné informace v sekci <strong>Detaily Události</strong>.</p>
    <button class='btn btn-primary mt-3' onclick='dashboardInformationBtnClick()'>
      <i class='bi bi-pencil-fill'></i> Nastavit Detaily Události
    </button>
  </div>
</div>
    """

    self.innerHTML = template
  end
end