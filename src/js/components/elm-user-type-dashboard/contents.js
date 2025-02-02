export default class CContents {
  constructor(parent) {
    this._parent = parent;
    this._dashboardContainer = this._parent.querySelector("#dashboardContainer")
  };

  initElmInformations() {
    return this._dashboardContainer.innerHTML = "<elm-dashboard-information></elm-dashboard-information>"
  };

  initElmEvents(eventDetails) {
    let elements = [
      "<div class='container my-5'>",
      "<h1 class='text-center mb-4'>Účastníci</h1>",
      "<div class='accordion' id='accordionPanelsStayOpenDashboardEvents'>"
    ];

    for (let eventDetail of eventDetails) {
      let template = `${`
<div class='accordion-item'>
  <h2 class='accordion-header'>
    <button class='accordion-button fw-semibold text-dark bg-light shadow-sm' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapse${eventDetail.id}' aria-expanded='true' aria-controls='panelsStayOpen-collapse${eventDetail.id}'>
      <span class='h5 w-100 text-center'>${eventDetail.name}</span>
    </button>
  </h2>
  <div id='panelsStayOpen-collapse${eventDetail.id}' class='accordion-collapse collapse show'>
    <div class='accordion-body'>
      <elm-dashboard-candidates event-id='${eventDetail.id}'></elm-dashboard-candidates>
    </div>
  </div>
</div>
      `}`;
      elements.push(template)
    };

    elements.push("</div>");
    elements.push("</div>");
    return this._dashboardContainer.innerHTML = elements.join("")
  }
}