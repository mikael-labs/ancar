import { getIn, useFormik } from "formik";

export const getIsInvalid = (form: ReturnType<typeof useFormik<any>>, fieldName: string) => {
  return getIn(form.errors, fieldName) && getIn(form.touched, fieldName);
};
