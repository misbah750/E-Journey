/**
 * Step 2 of the admin login (/admin): GitHub sends the editor back here with a one-time code,
 * which is exchanged for an access token and handed to the admin window that opened the login.
 * Needs OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel (see README).
 */
const readCookie = (req, name) =>
  (req.headers.cookie || '')
    .split(';')
    .map((c) => c.trim().split('='))
    .find(([key]) => key === name)?.[1];

function reply(res, status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  // Escape "<" so nothing in the message can close the script tag.
  const safe = JSON.stringify(message).replace(/</g, '\\u003c');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Set-Cookie', 'decap_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  res.end(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>e-Journey Admin login</title></head>
<body style="font-family:sans-serif;padding:24px">
<p>${status === 'success' ? 'Logged in. This window will close.' : 'Login failed. Close this window and try again.'}</p>
<script>
(function () {
  var message = ${safe};
  function receive(e) {
    // Only hand the login to the admin page on this same website.
    if (e.origin !== window.location.origin) return;
    window.opener.postMessage(message, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  if (window.opener) window.opener.postMessage('authorizing:github', window.location.origin);
})();
</script>
</body>
</html>`);
}

export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const { code, state } = req.query || {};

  if (!clientId || !clientSecret) {
    reply(res, 'error', { message: 'Admin login is not set up yet (missing GitHub keys in Vercel).' });
    return;
  }
  if (!code || !state || state !== readCookie(req, 'decap_oauth_state')) {
    reply(res, 'error', { message: 'Login could not be verified. Please try again.' });
    return;
  }

  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${proto}://${host}/api/callback`,
      }),
    });
    const data = await response.json();
    if (!data.access_token) {
      reply(res, 'error', { message: data.error_description || 'GitHub did not approve the login.' });
      return;
    }
    reply(res, 'success', { token: data.access_token, provider: 'github' });
  } catch {
    reply(res, 'error', { message: 'Could not reach GitHub. Please try again.' });
  }
}
