/* Consistent, reusable outline icons for the veterinary services section. */
(function () {
  var icons = {
    wellness: '<path d="M12 12.5c-1.6-1.8-5-1.3-5 1.6 0 2.2 2.1 4.1 5 6.4 2.9-2.3 5-4.2 5-6.4 0-2.9-3.4-3.4-5-1.6Z"/><path d="M8.2 8.1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3.8-1.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3.8 1.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M15.4 4.2h1.2a3.4 3.4 0 0 1 3.4 3.4v1.2M20 8.8v1.4a1.6 1.6 0 0 1-3.2 0V9"/>',
    microchip: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 2.5v4m6-4v4M9 17.5v4m6-4v4M2.5 9h4m-4 6h4m11-6h4m-4 6h4M19.5 4.5a5 5 0 0 1 0 7M22 2a8.5 8.5 0 0 1 0 12"/>',
    surgery: '<path d="m14.2 4.2 5.6 5.6M16.3 6.3l3.1-3.1a1.8 1.8 0 0 1 2.5 2.5l-3.1 3.1M14.2 4.2 5.1 13.3a4 4 0 0 0 0 5.7l.1.1a4 4 0 0 0 5.7 0L20 10M3 21l4-4m1.2-6.2 5 5"/><path d="M5.5 2.5v4m-2-2h4"/>',
    vaccination: '<path d="m14.5 4.5 5 5M17 2l5 5M12.5 6.5l5 5M5 14l5 5M3 21l3-3m-1-4 8-8 5 5-8 8H5v-5Zm10-10 3-3m-1 13.5 2.2-1.2 2.2 1.2-.4-2.5 1.8-1.8-2.5-.4L18 10.5l-1.1 2.3-2.5.4 1.8 1.8-.4 2.5Z"/>',
    emergency: '<path d="M12 21s-8-4.3-8-11V5l8-3 8 3v5c0 6.7-8 11-8 11Z"/><path d="M12 7v5m-2.5-2.5h5M5.5 13h3l1.5-2.5 2.5 5L14 13h4.5"/>',
    dental: '<path d="M12 21c-1.7 0-2.1-3.7-3.2-4.1-1.2-.5-2 2.1-3.2 1.3-1.4-1-1.8-4.7-1.8-7.1 0-4.1 2.6-6.1 5.7-5.2 1.6.5 1.4.5 2.5 0 3.1-.9 5.7 1.1 5.7 5.2 0 2.4-.4 6.1-1.8 7.1-1.2.8-2-1.8-3.2-1.3C14.1 17.3 13.7 21 12 21Z"/><path d="m19.5 2 .7 1.8L22 4.5l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/>'
  };

  class ServiceIcon extends HTMLElement {
    connectedCallback() {
      var name = this.getAttribute("name");
      if (!icons[name] || this.firstChild) return;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var label = this.getAttribute("label");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", this.getAttribute("size") || "26");
      svg.setAttribute("height", this.getAttribute("size") || "26");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", this.getAttribute("color") || "currentColor");
      svg.setAttribute("stroke-width", "1.7");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("focusable", "false");
      if (label) {
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", label);
      } else {
        svg.setAttribute("aria-hidden", "true");
      }
      if (this.getAttribute("class")) svg.setAttribute("class", this.getAttribute("class"));
      svg.innerHTML = icons[name];
      this.replaceChildren(svg);
    }
  }

  if (!customElements.get("service-icon")) customElements.define("service-icon", ServiceIcon);
})();