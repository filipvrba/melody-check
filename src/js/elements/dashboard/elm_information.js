export default class ElmDashboardInformation extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    window.dashboardInformationBtnClick = this.btnClick.bind(this)
  };

  btnClick() {
    URLParams.set("sc-index", 0);
    return location.hash = "settings"
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  }
}