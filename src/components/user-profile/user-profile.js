const template = document.createElement('template');

template.innerHTML = `
<style>

</style>

<h1>
  Profile Component
</h1>
`;

export class TigUserProfile extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // On Init CallBack
  connectedCallback() {
    console.log('Component Profile added to DOM');
  }

  // on Destroy CallBack
  disconnectedCallback() {
    console.log('Component Profile added to DOM');
  }
}

window.customElements.define('tig-user-profile', TigUserProfile);