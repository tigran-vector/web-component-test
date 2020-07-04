const template = document.createElement('template');

template.innerHTML = `
<style>
	:host {
    padding: 8px;
  }

	.list {
    background-color: #fafafa;
    border: solid 1px #c8c8c8;
    border-radius: 4px;
    padding: 4px;
	}

	.list__empty-stage {
		width: 100%;
		padding: 8px;
		font-size: 16px;
		line-height: 1.2;
		text-align: center;
		text-transform: uppercase;
	}

	.list__empty-stage--active {
		display: block;
	}

	.list__empty-stage--hide {
		display: none;
	}
</style>

<div class="list">
  <div class="list__empty-stage list__empty-stage--active"></div>
  <div class="list__content">
    <slot></slot>
  </div>
</div>
`;

export class TigList extends HTMLElement {

  static get observedAttributes() {
    return ['empty-message', 'data-list'];
  }

  constructor() {
    super();
    // Rendering Html in dom 
    // Using close encapsulation to avoid external influence
    const root = this.attachShadow({ mode: 'closed' });
    root.appendChild(template.content.cloneNode(true));
    this.listContent = root.querySelector('div.list');
    const slot = this.listContent.querySelector('slot');
    console.log(slot);
  }

  emptyStageSwift() {
    const messageContainer = this.listContent.querySelector('div.list__empty-stage');
    if (!this._data || this._data.length <= 0) {
      messageContainer.classList.remove('list__empty-stage--hide');
      messageContainer.classList.add('list__empty-stage--active');
    } else {
      messageContainer.classList.remove('list__empty-stage--active');
      messageContainer.classList.add('list__empty-stage--hide');
    }
  }

  get emptyMessage() {
    return this.getAttribute('empty-message');
  }

  set emptyMessage(msg) {
    const value = msg || 'Not content';
    this.setAttribute('empty-message', value);
    const messageContainer = this.listContent.querySelector('div.list__empty-stage');
    messageContainer.innerHTML = msg;
    this.emptyStageSwift();
  }

  get listData() {
    return this.getAttribute('data-list')
  }

  set listData(data) {
    this.setAttribute('data-list', data || []);
    this._data = data;
    this.emptyStageSwift();
  }

  // On Init CallBack
  connectedCallback() {
    console.log('Component List added to DOM');
  }

  // on Destroy CallBack
  disconnectedCallback() {
    console.log('Component List added to DOM');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }

    switch (name) {
      case 'empty-message':
        this.emptyMessage = newVal;
        break;
      case 'data-list':
        this.listData = newVal;
        break;
      default:
        return;
    }
  }
}

window.customElements.define('tig-list', TigList);