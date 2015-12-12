import CryptoJS from './vendor/Crypto';

var generatePassword = function(serviceName, salt) {
  if(!serviceName) {
    throw new Error('Servicename is missing');
  }
  if(salt.length < 6) {
    throw new Error('Salt is too short.')
  }
  var copwd = serviceName.trim() + salt.trim();
  var password = btoa(CryptoJS.SHA1(copwd)).substr(0,32);
  return password;
}

export default generatePassword;