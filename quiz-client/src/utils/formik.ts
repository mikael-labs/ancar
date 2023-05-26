import { getIn, useFormik } from "formik";

export const getIsInvalid = (form: ReturnType<typeof useFormik<any>>, fieldName: string) => {
  return getIn(form.errors, fieldName) && getIn(form.touched, fieldName);
};

export const getHelpers = (form: ReturnType<typeof useFormik<any>>, fieldName: string) => {
  return {
    name: fieldName as string,
    value: getIn(form.values, fieldName),
    onChange: form.handleChange,
    onBlur: form.handleBlur,
  };
};
