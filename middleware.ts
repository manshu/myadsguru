import { NextRequest, NextResponse } from "next/server";

const ALLOWED_COUNTRIES = ["US", "PR"];

const BLOCKED_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Region Unavailable — MyAds.Guru</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0a0a;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:1.5rem}
.c{width:100%;max-width:28rem}
.logo{text-align:center;margin-bottom:2rem;font-size:1.25rem;font-weight:700;letter-spacing:-.02em}
.logo span{color:#3b82f6}
.card{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);border-radius:1rem;padding:1.5rem;backdrop-filter:blur(8px)}
.card h1{font-size:1.5rem;font-weight:700;text-align:center}
.card p{color:#a1a1aa;font-size:.875rem;line-height:1.6;text-align:center;margin-top:.5rem}
.btn{display:block;width:100%;margin-top:1.5rem;padding:.75rem;background:#2563eb;color:#fff;text-align:center;text-decoration:none;border-radius:.5rem;font-size:.875rem;font-weight:600;transition:background .2s}
.btn:hover{background:#3b82f6}
.sub{color:#52525b;font-size:.6875rem;text-align:center;margin-top:.75rem}
</style>
</head>
<body>
<div class="c">
<div class="logo">MyAds<span>.Guru</span></div>
<div class="card">
<h1>This site is not available in your region</h1>
<p>MyAds.Guru is currently only available in the United States. If you have questions, please reach out.</p>
<a class="btn" href="mailto:hello@myads.guru">Contact Us</a>
<p class="sub">We usually respond within 1–2 business days.</p>
</div>
</div>
</body>
</html>`;

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // CF-IPCountry is the real user's country when traffic goes through Cloudflare proxy.
  // x-vercel-ip-country can be wrong because Vercel sees Cloudflare's edge IP.
  const country =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    "UNKNOWN";

  if (!ALLOWED_COUNTRIES.includes(country)) {
    return new NextResponse(BLOCKED_HTML, {
      status: 403,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
