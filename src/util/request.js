function csvJSON(csv) {
  // This code was used from --> http://techslides.com/convert-csv-to-json-in-javascript
  let lines = csv.split("\n");

  let result = [];

  let headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {

    let obj = {};
    let currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return JSON.stringify(result);
}

function normalizeRespond(data) {
  let normalizedData = [];
  try {
    normalizedData = JSON.parse(data);
  } catch (error) {
    normalizedData = JSON.parse(csvJSON(data));
  }
  return normalizedData;
}

export function requestData(url) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      // This code was used from -> https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
      if (this.readyState === 4 && this.status === 200) {
        resolve(normalizeRespond(this.responseText));
      }
      if (this.status === 403 || this.status === 400 || this.status === 404) {
        reject(new Error('Bad request'));
      }
    };
    // 
    xhttp.open('GET', url, true);
    xhttp.send();
  });
}