export function securityHeadersMiddleware(nodeEnv) {
  return (_req, res, next) => {
    res.setHeader('x-content-type-options', 'nosniff')
    res.setHeader('x-frame-options', 'DENY')
    res.setHeader('referrer-policy', 'no-referrer')
    res.setHeader('permissions-policy', 'camera=(), microphone=(), geolocation=()')
    res.setHeader(
      'content-security-policy',
      "default-src 'self'; script-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    )
    if (nodeEnv === 'production') {
      res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains')
    }
    next()
  }
}
