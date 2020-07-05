// import { ListItemCustomerClick } from '../../util/list-item-click-event.js';

const template = document.createElement('template');

template.innerHTML = `
<style>
	:host {
    padding: 8px;
  }

  .hide-content{
    display:none;
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

  .list__item{
    border-style: solid;
    border-width: 0;
    border-bottom-width: 1px;
    border-color: #c8c8c8;
    cursor: pointer;
  }

  .list__item:last-child{
    border: none;
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
    return ['empty-message', 'data-list', 'customer-item-field'];
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this._listContent = root.querySelector('div.list');
    this._slot = this._listContent.querySelector('slot');

    this._slot.addEventListener('slotchange', event => {
      const node = this._slot.assignedNodes()[0];
      if (node) {
        console.log(node);
        this._listItemTemplate = node.nextSibling.outerHTML;
        this.normalizeRender();
      }
    });
  }

  setEmptyMessage(value) {
    const msg = value || 'Not content';
    this.setAttribute('empty-message', msg);
    const messageContainer = this._listContent.querySelector('div.list__empty-stage');
    messageContainer.innerHTML = msg;
    this.emptyStageSwift();
  }

  setListData(value) {
    const itemData = JSON.parse(value);
    this._data = itemData;
    this.emptyStageSwift();
    this.render();
  }

  setCustomerItemField(value) {
    this._customerField = value
    this.setAttribute('customer-item-field', value)
  }

  // On Init CallBack
  connectedCallback() {
    this._messageContainer = this._listContent.querySelector('div.list__empty-stage');
    this.normalizeRender();
    this.emptyStageSwift();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }

    switch (name) {
      case 'empty-message':
        this.setEmptyMessage(newVal);
        break;
      case 'data-list':
        this.setListData(newVal);
        break;
      case 'customer-item-field':
        this.setCustomerItemField(newVal);
        break;
      default:
        return;
    }
  }

  render() {
    this._listContent.innerHTML = '';
    this._data.forEach((itemData, idx) => {
      const item = this.constructListItem(itemData, idx);
      this._listContent.appendChild(item);
    });

  }

  emptyStageSwift() {
    if (!this._data || this._data.length <= 0) {
      this._messageContainer.classList.remove('list__empty-stage--hide');
      this._messageContainer.classList.add('list__empty-stage--active');
    } else {
      this._messageContainer.classList.remove('list__empty-stage--active');
      this._messageContainer.classList.add('list__empty-stage--hide');
    }
  }

  normalizeRender() {
    this._slot.classList.add('hide-content');
  }

  triggerEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    let customEvent = new ListItemCustomerClick('clickToItemList', {
      id: +event.path[1].id
    });
    let parentElement = document.querySelector('tig-list');
    parentElement.dispatchEvent(customEvent);
  }

  constructListItem(itemData, idx) {
    const customerTemplate = this._listItemTemplate;
    const clone = document.createElement('div');
    clone.classList.add('list__item')
    clone.setAttribute('id', idx);
    clone.addEventListener('click', this.triggerEvent);
    clone.innerHTML = customerTemplate;
    clone.childNodes[0].setAttribute(this._customerField, JSON.stringify(itemData));
    return clone;
  }
}


window.customElements.define('tig-list', TigList);