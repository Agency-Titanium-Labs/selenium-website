import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url");
  if (!urlParam) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const targetUrl = new URL(urlParam);
    if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
      return new NextResponse("Invalid protocol", { status: 400 });
    }

    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return NextResponse.redirect(targetUrl.toString());
    }

    let html = await response.text();

    // Strip frame-restricting meta tags if present
    html = html.replace(
      /<meta[^>]*http-equiv=["']?(?:content-security-policy|x-frame-options)["']?[^>]*>/gi,
      "",
    );

    // Strip simple frame-busting scripts
    html = html.replace(
      /if\s*\(\s*(?:window\.)?top\s*!==\s*(?:window\.)?self\s*\)/gi,
      "if (false)",
    );

    // Ensure relative assets and links point to the original site
    const baseUrl = `${targetUrl.protocol}//${targetUrl.host}`;
    const baseTag = `<base href="${baseUrl}/">`;

    // Intercept History API calls in the iframe to prevent cross-origin SecurityErrors
    const patchScript = `
<script>
  (function() {
    try {
      var origReplaceState = history.replaceState ? history.replaceState.bind(history) : null;
      var origPushState = history.pushState ? history.pushState.bind(history) : null;

      if (origReplaceState) {
        history.replaceState = function(state, title, url) {
          try {
            return origReplaceState(state, title, url);
          } catch (e) {
            // Silently absorb cross-origin History SecurityError
            return null;
          }
        };
      }

      if (origPushState) {
        history.pushState = function(state, title, url) {
          try {
            return origPushState(state, title, url);
          } catch (e) {
            // Silently absorb cross-origin History SecurityError
            return null;
          }
        };
      }
    } catch (e) {}
  })();
</script>
`;

    const injection = `${baseTag}${patchScript}`;

    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${injection}`);
    } else if (html.includes("<HEAD>")) {
      html = html.replace("<HEAD>", `<HEAD>${injection}`);
    } else {
      html = injection + html;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Frame-Options": "ALLOWALL",
      },
    });
  } catch (error) {
    console.error("Preview proxy error:", error);
    return new NextResponse(`Error loading preview: ${String(error)}`, {
      status: 500,
    });
  }
}
