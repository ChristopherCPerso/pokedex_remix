import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { z } from "zod";
import BackButton from "~/components/UI/BackButton";
import Header from "~/components/UI/Header";
import { commitSession, getSession } from "~/utils/db.sessions";
import { login } from "~/utils/db.user.action";

const Schema = z.object({
  email: z
    .string({ required_error: "Merci de saisir votre email" })
    .email("Merci de sairi un email valide"),
  password: z
    .string({ required_error: "Merci de saisir votre mot de passe" })
    .min(8, "Le mot de passe est trop court."),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const url = new URL(request.url);
  console.log(url);
  if (session.has("email")) {
    return redirect("/dashboard");
  }
  const data = { error: session.get("error") };
  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: Schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const user = await login(submission.value.email, submission.value.password);
    session.set("email", user!.email);
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("RedirectTo");
    return redirect(redirectTo || "/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    session.set("error", "Invalid email and/or password");
    return submission.reply({
      formErrors: ["L'email et/ou le mot de passe est/sont invalide/s"],
    });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  const [form, fields] = useForm({
    constraint: getZodConstraint(Schema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: Schema,
      });
    },
    lastResult: actionData,
    shouldValidate: "onBlur",
  });

  return (
    <>
      <Header title="Connexion" backButton={<BackButton />} />
      <div>
        <p className="px-7 text-grass">
          <Link to={"/auth/register"}>Pas encore de compte ?</Link>
        </p>
      </div>
      <div>
        <Form
          {...getFormProps(form)}
          method="POST"
          className="relative mx-auto mt-10 h-screen space-y-6 rounded-tl-3xl rounded-tr-3xl bg-white px-4 py-8"
        >
          <div id={form.errorId}>{form.errors}</div>
          <input
            className={`mb-1 block w-full rounded-md  px-4 py-2 placeholder-gray-300 shadow-sm ring-1 ring-slate-400 focus:ring-red-950`}
            id={fields.email.id}
            type="email"
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
            required={fields.email.required}
            aria-invalid={fields.email.errors ? true : undefined}
            aria-describedby={
              fields.email.errors ? fields.email.errorId : undefined
            }
            placeholder="Email"
          />
          <div className="text-red-500">{fields.email.errors}</div>

          <input
            className={`mb-1 block w-full rounded-md  px-4 py-2 placeholder-gray-300 shadow-sm ring-1 ring-slate-400`}
            id={fields.password.id}
            type="password"
            name={fields.password.name}
            defaultValue={fields.password.initialValue}
            required={fields.password.required}
            aria-invalid={fields.password.errors ? true : undefined}
            aria-describedby={
              fields.password.errors ? fields.password.errorId : undefined
            }
            placeholder="Password"
          />
          <div className="text-red-500">{fields.password.errors}</div>
          <button
            className=" w-full rounded-md border-transparent bg-grass px-6 py-3 text-base font-medium text-white shadow-sm"
            type="submit"
            disabled={!form.valid || !form.dirty}
          >
            Se connecter
          </button>
        </Form>
      </div>
    </>
  );
}
