export default class CContents {
  constructor(parent) {
    this._parent = parent
  };

  errorContent() {
    return `${`
<div class='container mt-5'>
  <div class='card'>
    <div class='card-header text-center'>
      <h3>Potvrzení účasti</h3>
    </div>
    <div class='card-body'>
      
      <div class='alert alert-danger text-center' role='alert'>
        <i class='bi bi-x-circle-fill' style='font-size: 3rem; color: red;'></i>
        <h4 class='alert-heading'>Chyba</h4>
        <p>Požadavek nemůže být zpracován. Chybí potřebné parametry v URL.</p>
      </div>

    </div>
  </div>
</div>
      `}`
  };

  confirmContent(candidateName, eventName) {
    return `${`
<div class='container mt-5'>
  <div class='card'>
    <div class='card-header text-center'>
      <h3>Potvrzení účasti</h3>
    </div>
    <div class='card-body'>
      <div class='d-flex justify-content-center mb-4'>
        <i class='bi bi-check-circle-fill' style='font-size: 3rem; color: green;'></i>
      </div>
      
      <h5 class='text-center'>Děkujeme za potvrzení!</h5>
      <p class='text-center'>Pokud chcete upřesnit čas příchodu, vyplňte níže datum a čas.</p>

      <div class='row'>
        <div class='col-12 text-center'>
          <p><strong>Jméno uchazeče:</strong> <span id='candidateName'>${candidateName}</span></p>
          <p><strong>Název eventu:</strong> <span id='eventName'>${eventName}</span></p>
        </div>
      </div>

      <elm-confirm-date></elm-confirm-date>
    </div>
  </div>
</div>
    `}`
  };

  confirmAgainContent(candidateName, eventName) {
    return `${`
<div class='container mt-5'>
  <div class='card'>
    <div class='card-header text-center'>
      <h3>Účast již byla potvrzena</h3>
    </div>
    <div class='card-body'>
      <div class='d-flex justify-content-center mb-4'>
        <i class='bi bi-check-circle-fill' style='font-size: 3rem; color: green;'></i>
      </div>
      
      <h5 class='text-center'>Vaše účast na následujícím eventu byla již potvrzena!</h5>
      <p class='text-center'>Pokud chcete upřesnit čas příchodu, vyplňte níže datum a čas.</p>

      <div class='row'>
        <div class='col-12 text-center'>
          <p><strong>Jméno uchazeče:</strong> <span id='candidateName'>${candidateName}</span></p>
          <p><strong>Název eventu:</strong> <span id='eventName'>${eventName}</span></p>
        </div>
      </div>

      <elm-confirm-date></elm-confirm-date>
    </div>
  </div>
</div>
    `}`
  };

  noInformationsContent() {
    return `${`
<div class='container mt-5'>
  <div class='card'>
    <div class='card-header text-center'>
      <h3>Chyba: Neplatné informace</h3>
    </div>
    <div class='card-body'>
      <div class='d-flex justify-content-center mb-4'>
        <i class='bi bi-x-circle-fill' style='font-size: 3rem; color: red;'></i>
      </div>
      
      <h5 class='text-center'>Zadané informace jsou neplatné!</h5>
      <p class='text-center'>Požadavek nemohl být zpracován, protože některé informace v URL nejsou platné.</p>

      <div class='row'>
        <div class='col-12 text-center'>
          <p><strong>Možné příčiny:</strong></p>
          <ul class='list-unstyled'>
            <li>Chybí požadované parametry v URL.</li>
            <li>Parametry obsahují neplatné nebo neúplné hodnoty.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
    `}`
  }
}