import { NextPage } from "next";
import { BaseLayout } from "../../layouts/base-layout";
import HeaderLayout from "../../layouts/header";
import { Form } from "../../components/form";
import { Input } from "../../components/input";
import { PasswordInput } from "../../components/input/password_input";
import BgImage from "../../components/background/bg-image";
import Backdrop from "../../components/background/backdrop";
import Button from "../../components/button";
import React, { useEffect, useState } from "react";
import { isPasswordValid, isValidEmail } from "../../utilities/validate";
import {
  invalidEmailErrorText,
  invalidPasswordErrorText,
} from "../../utilities/message";
import { signinUser } from "../../data/auth";
import { ToastError, ToastSuccess } from "../../components/toast";
import { useAuth } from "../../auth/AuthContext";
import { saveAuth } from "../../utilities/storage";
import { useRouter } from "next/router";
// import { useFormState, useFormStatus } from 'react-dom';

const Signin: NextPage = (props) => {
  const formInitialState = {
    email: null,
    password: null,
  };
  // const formState = useFormState();
  const [errors, setErrors] = useState(formInitialState);
  const [loading, setLoading] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("SIGN IN");
  const [loginError, setLoginError] = useState("");
  const { setAuthUser, getAuthUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      setSubmitButtonText("Loading...");
    } else {
      setSubmitButtonText("SIGN IN");
    }
  }, [loading]);
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let hasErrors = false;
    const validationErrors: any = {};
    const email = form.email.value;
    const password = form.password.value;
    if (!isValidEmail(email)) {
      hasErrors = true;
      // validationErrors.errors.email = invalidEmailErrorText;
      validationErrors["email"] = invalidEmailErrorText;
    }
    if (!isPasswordValid(password)) {
      hasErrors = true;
      // validationErrors.errors.password = invalidPasswordErrorText;
      validationErrors["password"] = invalidPasswordErrorText;
    }
    if (hasErrors) {
      setErrors({ ...validationErrors });
    } else {
      if (loginError != "") {
        setLoginError("");
      }
      setErrors(formInitialState);
      setLoading(true);
      signinUser({ email, password })
        .then((response) => {
          const { statusCode, message, data } = response;
          console.log(data);
          if (statusCode >= 200 && statusCode <= 202) {
            ToastSuccess({ message });
            saveAuth(data);
            setAuthUser(data);
            router.replace("/");
          } else if (statusCode >= 400 && statusCode <= 505) {
            setLoginError(message);
            ToastError({ message });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  return (
    <BaseLayout>
      <BgImage>
        <HeaderLayout authData={getAuthUser()} />
        <Backdrop>
          <main className=" w-full h-screen py-4">
            <section className=" mt-[0px]">
              <div className=" w-full max-w-lg m-auto">
                <Form method="POST" handleSubmit={handleSubmit}>
                  {loginError != "" && (
                    <div className=" py-3 text-red-500">{loginError}</div>
                  )}
                  <section className="grid gap-6">
                    <Input
                      name="email"
                      required={true}
                      label={"Email"}
                      type="email"
                      error={errors.email != null}
                      errorText={errors.email}
                    />
                    <PasswordInput
                      name="password"
                      required={true}
                      error={errors.password != null}
                      errorText={errors.password}
                    />
                    {/* <section className="form-block">
                                    <input type="submit" value="SIGN IN" />
                                </section> */}
                    <Button
                      disable={loading}
                      type="submit"
                      handleClick={() => {}}
                      text={submitButtonText}
                    />
                  </section>
                </Form>
              </div>
            </section>
          </main>
        </Backdrop>
      </BgImage>
    </BaseLayout>
  );
};

export default Signin;
