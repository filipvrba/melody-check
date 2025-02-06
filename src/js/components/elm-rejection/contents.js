import CContentsConfirm from "../elm-confirm/contents";

export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._cContentsConfirm = new CContentsConfirm(this._parent)
  };

  errorContent() {
    return this._cContentsConfirm.errorContent()
  };

  noInformationsContent() {
    return this._cContentsConfirm.noInformationsContent()
  };

  rejectionContent(candidateName, eventName) {
    return `${`
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
          <p><strong>Jméno uchazeče:</strong> <span id='candidateName'>${candidateName}</span></p>
          <p><strong>Název eventu:</strong> <span id='eventName'>${eventName}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
    `}`
  };

  rejectionAgainContent(candidateName, eventName) {
    return `${`
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
          <p><strong>Jméno uchazeče:</strong> <span id='candidateName'>${candidateName}</span></p>
          <p><strong>Název eventu:</strong> <span id='eventName'>${eventName}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
    `}`
  }
}