export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/robots.txt') {
      return new Response(
        'User-agent: *\nAllow: /\n\nSitemap: https://minsenair.com/sitemap.xml\n',
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }
    return fetch(request);
  }
}
