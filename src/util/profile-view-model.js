export class ProfileUserModel {


  constructor(data) {
    this.userid = null;
    this.picture = null;
    this.title = null;
    this.firstname = null;
    this.lastname = null;
    this.gender = null;
    this.address = null;
    this.email = null;
    this.login = null;
    this.password = null;

    let keys = Object.keys(data);
    let keysLength = keys.length;
    let counter = 0;
    do {
      if (this[keys[counter].toLowerCase()] !== undefined) {
        this[keys[counter].toLowerCase()] = data[keys[counter]];
      }
      counter++;
    } while (counter !== keysLength);
  }
}
