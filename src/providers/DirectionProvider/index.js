import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function DirectionProvider({ children, direction }) {
  if (direction === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }
  return children;
}
