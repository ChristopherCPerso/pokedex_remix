import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import BackButton from "~/components/UI/BackButton";
import Header from "~/components/UI/Header";
import { addUser, getUserByEmail } from "~/utils/db.user.action";

const Schema = z.object({
  username: z.string({ required_error: "Merci d'écrire un username" }),
  email: z
    .string({ required_error: "Merci d'inscrire votre email" })
    .email({ message: "Votre email doit avoir un format valide" }),
  password: z
    .string({ required_error: "Merci d'écrire un mot de passe valide" })
    .min(8, {
      message: "Votre mot de passe doit contenir 8 caractères au minimum",
    }),
  password_confirm: z
    .string({ required_error: "Merci d'écrire un mot de passe valide" })
    .min(8, {
      message: "Votre mot de passe doit contenir 8 caractères au minimum",
    }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    schema: Schema.superRefine(async (data, ctx) => {
      const { email } = data;
      const user = await getUserByEmail(email);
      const isAllReadyExist = user?.email;
      if (isAllReadyExist) {
        ctx.addIssue({
          code: "custom",
          path: ["email"],
          message: "L'email est déjà utilisé",
        });
      }

      if (data.password != data.password_confirm) {
        ctx.addIssue({
          code: "custom",
          path: ["password_confirm"],
          message: "Les mots de passe ne correspondent pas",
        });
      }
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    await addUser(
      submission.value.username,
      submission.value.email,
      submission.value.password,
    );
  } catch (error) {
    return submission.reply({
      formErrors: ["Invalid fields"],
    });
  }
  return redirect("/pokedex");
};

export default function Register() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    constraint: getZodConstraint(Schema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: Schema,
      });
    },
    shouldValidate: "onBlur",
  });
  return (
    <>
      <Header title="S'inscrire" backButton={<BackButton />} />

      <div>
        <Form
          {...getFormProps(form)}
          method="POST"
          className="relative mx-auto mt-10 h-screen space-y-6 rounded-tl-3xl rounded-tr-3xl bg-white px-4 py-8"
        >
          <div id={form.errorId}>{form.errors}</div>
          <input
            className={`mb-1 block w-full rounded-md  px-4 py-2 placeholder-gray-300 shadow-sm ring-1 ring-slate-400 focus:ring-red-950`}
            id={fields.username.id}
            name={fields.username.name}
            defaultValue={fields.username.initialValue}
            required={fields.username.required}
            aria-invalid={fields.username.errors ? true : undefined}
            aria-describedby={
              fields.username.errors ? fields.username.errorId : undefined
            }
            placeholder="Username"
            type="text"
          />
          <div className="text-fire">{fields.username.errors}</div>

          <input
            className={`mb-1 block w-full rounded-md  px-4 py-2 placeholder-gray-300 shadow-sm ring-1 ring-slate-400 focus:ring-red-950`}
            id={fields.email.id}
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
            required={fields.email.required}
            aria-invalid={fields.email.errors ? true : undefined}
            aria-describedby={
              fields.email.errors ? fields.email.errorId : undefined
            }
            placeholder="Email"
            type="email"
          />
          <div className="text-fire">{fields.email.errors}</div>

          <input
            className={`mb-1 block w-full rounded-md  px-4 py-2 placeholder-gray-300 shadow-sm ring-1 ring-slate-400`}
            id={fields.password.id}
            name={fields.password.name}
            defaultValue={fields.password.initialValue}
            required={fields.password.required}
            aria-invalid={fields.password.errors ? true : undefined}
            aria-describedby={
              fields.password.errors ? fields.password.errorId : undefined
            }
            placeholder="Password"
            type="password"
          />
          <div className="text-fire">{fields.password.errors}</div>

          <input
            className={`mb-1 block w-full rounded-md  px-4 py-2 placeholder-gray-300 shadow-sm ring-1 ring-slate-400`}
            id={fields.password_confirm.id}
            name={fields.password_confirm.name}
            defaultValue={fields.password_confirm.initialValue}
            required={fields.password_confirm.required}
            aria-invalid={fields.password_confirm.errors ? true : undefined}
            aria-describedby={
              fields.password_confirm.errors
                ? fields.password_confirm.errorId
                : undefined
            }
            placeholder="Password confirm"
            type="password"
          />
          <div className="text-fire">{fields.password_confirm.errors}</div>

          <button
            className=" w-full rounded-md border-transparent bg-electric px-6 py-3 text-base font-medium text-white shadow-sm"
            type="submit"
          >
            S&apos;inscrire
          </button>
        </Form>
      </div>
    </>
  );
}
