const template = document.createElement('template');

template.innerHTML = `
<style>
	.user-profile__container {
		display: flex;
	}

	.user-profile__container--card {
		flex-direction: column;
	}

	.user-profile__container--list {
    flex-direction: row;
    align-items: center;
    padding: 4px 6px;
  }

	.avatar {
		width: 100%;
		background: #9c9c9c;
		border-radius: 50%;
		min-height: 50px;
  }
  
  .user-profile__container--list .avatar{
    max-width: 50px;
    max-height: 50px;
  }

	.avatar__img {
		width: 100%;
  }
  
  .info-block{
    width: 100%;
    font-size: 14px;
  }

  .user-profile__container--list .info-block{
    padding-left: 10px;
  }

</style>

<div class="user-profile">
	<div class="user-profile__container"></div>
</div>
`;

const defaultImage = 'https://svgsilh.com/svg_v2/1699635.svg';


export class TigUserProfile extends HTMLElement {

  static get observedAttributes() {
    return ['mode', 'user-data'];
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'closed' });
    this._root.appendChild(template.content.cloneNode(true));
    this._mainContainer = this._root.querySelector('.user-profile__container');
  }

  setMode(mode) {
    this._mode = mode || 'card';
  }

  setData(data) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    this._data = data;
    this.constructItem();
  }

  constructItem() {

    let avatar = this.createAvatarElement();
    let info = this.createInfoElement();

    this._mainContainer.appendChild(avatar);
    this._mainContainer.appendChild(info);

    this._mainContainer.classList.add((this._mode === 'card') ? 'user-profile__container--card' : 'user-profile__container--list')
  }

  createAvatarElement() {
    let avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar')
    let imageElement = document.createElement('img');
    imageElement.classList.add('avatar__img')
    imageElement.setAttribute('src', (this._data.picture) ? this._data.picture : defaultImage);
    imageElement.setAttribute('alt', 'Profile Image');
    avatarContainer.appendChild(imageElement);
    return avatarContainer;
  }

  createInfoElement() {
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('info-block');
    let title = document.createElement('h3');
    title.classList.add('info-block__title');
    title.innerHTML = `${(this._data.firstname) ? this._data.firstname : ''} ${(this._data.lastname) ? this._data.lastname : ''}`;
    infoContainer.appendChild(title);
    if (this._mode === 'card') {

    }
    return infoContainer;
  }

  // On Init CallBack
  connectedCallback() {

  }

  // on Destroy CallBack
  disconnectedCallback() {
    console.log('Component Profile added to DOM');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }

    switch (name) {
      case 'mode':
        this.setMode(newVal);
        break;
      case 'user-data':
        this.setData(newVal);
        break;
      default:
        return;
    }
  }
}

window.customElements.define('tig-user-profile', TigUserProfile);