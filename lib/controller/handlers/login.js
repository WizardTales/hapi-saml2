module.exports = {
  auth: false,
  handler: async (request, h) => {
    const { saml } = request.pre
    const loginUrl = await saml.getAuthorizeUrlAsync()
    
    if (request.headers['x-requested-with'] !== 'XMLHttpRequest') {
      return h.redirect(loginUrl)
    }
    return h.response({code: 302, redirectUrl: loginUrl }).code(302);
  },
  tags: ['api', 'saml'],
  description: 'SAML service provider login',
  notes: 'SAML service provider login'
}
