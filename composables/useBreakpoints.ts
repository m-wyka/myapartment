import { useBreakpoints as breakpointsVueuse } from "@vueuse/core";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config";

export const useBreakpoints = () => {
  const config = resolveConfig(tailwindConfig);
  const breakpoints = breakpointsVueuse(config.theme.screens);

  const xs = breakpoints.between("0", "xs");
  const sm = breakpoints.between("xs", "sm");
  const md = breakpoints.between("sm", "md");
  const lg = breakpoints.between("md", "lg");

  const smAndDown = breakpoints.smaller("sm");
  const mdAndDown = breakpoints.smaller("md");
  const lgAndDown = breakpoints.smaller("lg");

  return {
    xs,
    sm,
    md,
    lg,
    smAndDown,
    mdAndDown,
    lgAndDown,
  };
};
