import { z } from "zod";

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  const { t } = nuxtApp.$i18n;

  const expected = ["string", "number", "array"];

  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_string) {
      if (issue.validation === "email") {
        return { message: t("form.validation.email") };
      }
    }

    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (expected.includes(issue.expected)) {
        return { message: t("form.validation.required") };
      }
    }

    if (issue.code === z.ZodIssueCode.too_small) {
      return { message: t("form.validation.min", { value: issue.minimum }) };
    }

    if (issue.code === z.ZodIssueCode.too_big) {
      return { message: t("form.validation.max", { value: issue.maximum }) };
    }

    if (issue.code === z.ZodIssueCode.custom) {
      return { message: `less-than-${(issue.params || {}).minimum}` };
    }

    return { message: ctx.defaultError };
  };

  z.setErrorMap(customErrorMap);
});
