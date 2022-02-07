import React, { useContext, memo } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from "remix";

import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, withEmotionCache } from "@emotion/react";

import { getUserTheme, themeCookie } from "~/utils/theme.server";

import { getTheme } from "~/themes";

import ClientStyleContext from "~/context/ClientStyleContext";

import Header from "~/components/Header";
import Body from "~/components/Body";
import Footer from "~/components/Footer";

import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  HeadersFunction,
  ShouldReloadFunction,
  ActionFunction,
} from "remix";
import type { ThemeNames } from "~/themes";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

type LoaderData = {
  userTheme: ThemeNames;
};
export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  return {
    userTheme: await getUserTheme(request),
  };
};

export const action: ActionFunction = async ({ request }) => {
  const currentTheme = await getUserTheme(request);
  const theme: ThemeNames = currentTheme === "dark" ? "light" : "dark";

  return redirect(request.headers.get("referer") || "/", {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
    },
  });
};

/**
 * Provides an alert for screen reader users when the route is changed by the browser.
 */
const RouteChangeAnnouncement = memo(() => {
  const [hydrated, setHydrated] = React.useState(false);
  const [innerHtml, setInnerHtml] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live='assertive'
      aria-atomic
      id='route-change-region'
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
    >
      {innerHtml}
    </div>
  );
});

const App = () => {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
};

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};
const Document: React.FC<DocumentProps> = withEmotionCache(
  ({ children, title }, emotionCache) => {
    const loaderData = useLoaderData<LoaderData>();
    const theme = getTheme(loaderData?.userTheme);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang='en'>
        <head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <meta name='theme-color' content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}

          <Meta />
          <Links />
          <meta
            name='emotion-insertion-point'
            content='emotion-insertion-point'
          />
        </head>
        <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
          </ThemeProvider>
          {children}
          <RouteChangeAnnouncement />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    );
  }
);

const Layout: React.FC = ({ children }) => {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <>
      <Header theme={loaderData.userTheme} />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = <p>This is a custom error message for 404 pages</p>;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </Document>
  );
};

export default App;
