import CryptoJS from './vendor/Crypto';

var generatePassword = function(serviceName, salt) {
  var copwd = serviceName.trim() + salt.trim();
  var password = btoa(CryptoJS.SHA1(copwd)).substr(0,32);
  return password;
}

export default generatePassword;