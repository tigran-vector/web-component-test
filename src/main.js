'use strict';

import { requestData } from './util/request.js'
import { transformToComponentFormat } from './util/util.js'

(function () {

  const requestUrls = {
    cvs: 'assets/testtakers.csv',
    json: 'assets/testtakers.json',
    api: 'https://hr.oat.taocloud.org/v1/users?limit=20&offset=0'
  };

  function setupComponent(data) {
    const listElement = document.querySelector('tig-list');
    listElement.setAttribute('data-list', JSON.stringify(data));
  }

  function loadData(event) {
    event.stopPropagation();
    event.preventDefault();
    const selectedType = elementSelect.options[elementSelect.selectedIndex].value;
    if (!selectedType) {
      return;
    }
    requestData(requestUrls[selectedType])
      .then(function (data) {
        setupComponent(transformToComponentFormat(data));
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // Setup part
  const btn = document.querySelector('button');
  const elementSelect = document.querySelector('select');

  btn.addEventListener("click", loadData);
})();