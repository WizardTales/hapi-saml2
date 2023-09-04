const { SAML } = require('@node-saml/node-saml')

const createSAML = (options = {}) => {
  const instance = new SAML(options)
  instance.decryptionCert = options.decryptionCert
  if(options.privateKey) {
    instance.signingCert = options.signingCert;
  }
  return instance
}

module.exports = createSAML
