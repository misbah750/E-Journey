import crypto from 'node:crypto';

/**
 * Step 1 of the admin login (/admin): sends the editor to GitHub to sign in.
 * Needs OAUTH_GITHUB_CLIENT_ID set in Vercel → Settings → Environment Variables (see README).
 */
export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Admin login is not set up yet: add OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel.');
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const scope = req.query?.scope === 'repo' ? 'repo,user' : 'public_repo,user';
  const state = crypto.randomBytes(16).toString('hex');

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', `${proto}://${host}/api/callback`);
  url.searchParams.set('scope', scope);
  url.searchParams.set('state', state);

  // The state value is checked again in /api/callback so the login cannot be forged.
  res.setHeader('Set-Cookie', `decap_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  res.statusCode = 302;
  res.setHeader('Location', url.toString());
  res.end();
}
