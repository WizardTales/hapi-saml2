const Boom = require('@hapi/boom')

module.exports = {
  auth: false,
  handler: async (request, h) => {
    const { saml, logout } = request.pre
    const { nameIdFormat, nameId } = request.query || {}
    if (!nameIdFormat) {
      return Boom.badRequest('Missing required "nameIdFormat" query parameter')
    }
    if (!nameId) {
      return Boom.badRequest('Missing required "nameId" query parameter')
    }

    const user = {
      nameIDFormat: nameIdFormat,
      nameID: nameId
    }
    const logoutUrl = await saml.getLogoutUrlAsync(user)

    await logout(request, h)

    if (request.headers['x-requested-with'] !== 'XMLHttpRequest') {
      return h.redirect(logoutUrl)
    }

    return h.response({code: 302, redirectUrl: logoutUrl, callbackUrl: saml.options.frontendUrl }).code(302);

  },
  tags: ['api', 'saml'],
  description: 'SAML service provider logout',
  notes: 'SAML service provider logout'
}
