import { NextPage } from 'next';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { PasswordInput } from '../../components/input/password_input';
import Button from '../../components/button';
import React, { useEffect, useMemo, useState } from 'react';
import { isPasswordValid, isValidEmail } from '../../utilities/validate';
import {
  invalidEmailErrorText,
  invalidPasswordErrorText,
} from '../../utilities/message';
import { signinUser } from '../../data/auth';
import { ToastError, ToastSuccess } from '../../components/toast';
import { useAuth } from '../../auth/AuthContext';
import { saveAuth } from '../../utilities/storage';
import { useRouter } from 'next/router';
import GeneralLayout from '../../layouts/gen-layout';

type FormState = {
  email?: string | null;
  password?: string | null;
  [key: string]: string | null | undefined;
};

const Signin: NextPage = () => {
  const formInitialState: FormState = useMemo(
    () => ({
      email: null,
      password: null,
    }),
    []
  );
  const [errors, setErrors] = useState(formInitialState);
  const [loading, setLoading] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('SIGN IN');
  const [loginError, setLoginError] = useState<FormState>({});
  const { setAuthUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      setSubmitButtonText('Loading...');
      setErrors(formInitialState);
      setLoginError(formInitialState);
    } else {
      setSubmitButtonText('SIGN IN');
    }
    if (Object.keys(loginError).length > 0) {
      setErrors({ ...loginError });
    }
  }, [loading, loginError, formInitialState]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let hasErrors = false;
    const validationErrors: FormState = { email: null, password: null };
    const email = form.email.value;
    const password = form.password.value;
    if (!isValidEmail(email)) {
      hasErrors = true;
      validationErrors['email'] = invalidEmailErrorText;
    }
    if (!isPasswordValid(password)) {
      hasErrors = true;
      validationErrors['password'] = invalidPasswordErrorText;
    }
    if (hasErrors) {
      setErrors(validationErrors);
    } else {
      if (Object.keys(loginError).length > 0) {
        setLoginError({});
      }
      setErrors(formInitialState);
      setLoading(true);
      signinUser({ email, password })
        .then((response) => {
          const { statusCode, message, data } = response;
          if (statusCode >= 200 && statusCode <= 202) {
            ToastSuccess({ message });
            saveAuth(data);
            setAuthUser(data);
            router.replace('/');
          } else if (statusCode >= 400 && statusCode <= 505) {
            setLoginError(message);
            ToastError({ message });
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  return (
    <GeneralLayout>
      <main className='w-full h-screen py-4'>
        <section className=''>
          <div className='w-full max-w-lg m-auto'>
            <Form method='POST' handleSubmit={handleSubmit} title='Sign In'>
              {Object.keys(loginError).length > 0 && (
                <div className='py-3 text-red-500 border-b border-gray-300'>
                  {Object.keys(loginError).map((key) => {
                    return (
                      <div key={key}>
                        {Array.isArray(loginError[key]) &&
                          loginError[key].map((value: string) => {
                            return <span key={value}>{value}</span>;
                          })}
                      </div>
                    );
                  })}
                </div>
              )}
              <section className='grid gap-6 overflow-y-auto max-h-96 py-2 rounded shadow-inner'>
                <Input
                  name='email'
                  required={true}
                  label={'Email'}
                  type='email'
                  error={errors.email != null}
                  errorText={errors.email}
                />
                <PasswordInput
                  name='password'
                  required={true}
                  error={errors.password != null}
                  errorText={errors.password}
                />
              </section>
              <Button
                disable={loading}
                type='submit'
                handleClick={() => {}}
                text={submitButtonText}
                extra_css='mt-5 w-full'
              />
            </Form>
          </div>
        </section>
      </main>
    </GeneralLayout>
  );
};

export default Signin;
