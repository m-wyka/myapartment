import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { phoneRegex } from "~/constants/regex";

export const validationSchemas = () => {
  const { t } = useI18n();

  const basicStringSchema = z.string().min(3).max(255);
  const emailSchema = z.string().email();
  const phoneSchema = z.string().regex(phoneRegex, t("form.validation.phone"));
  const numberRequired = z.number();

  const numberRequiredNullableSchema = z
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable();

  const arrayRequiredSchema = z
    .array(
      z.object({
        id: z.number(),
      })
    )
    .nonempty();

  return {
    basicStringSchema,
    emailSchema,
    phoneSchema,
    numberRequired,
    numberRequiredNullableSchema,
    arrayRequiredSchema,
  };
};
