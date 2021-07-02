import { inspect } from "@xstate/inspect";

// TODO What's the best way to enable this for debug-only? `XSTATE=true npm start`?
if (typeof window !== "undefined") {
  inspect();
}

export function XStateInspector() {
  return <iframe data-xstate style={{ width: "100%", height: "40ch" }} />;
}
