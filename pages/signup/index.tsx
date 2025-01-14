import { NextPage } from 'next';
// import { BaseLayout } from '../../layouts/base-layout';
// import BgImage from '../../components/background/bg-image';
// import HeaderLayout from '../../layouts/header';
// import Backdrop from '../../components/background/backdrop';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { ToastError, ToastSuccess } from '../../components/toast';
import { saveAuth } from '../../utilities/storage';
import {
  SignupFormState,
  signupUser,
  SignupUserPayload,
} from '../../data/auth';
import { signupValidation } from '../../utilities/validate';
import Button from '../../components/button';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { PasswordInput } from '../../components/input/password_input';
import { InputChangeEvent } from '../../utilities/types';
import GeneralLayout from '../../layouts/gen-layout';

const Signup: NextPage = () => {
  const formInitialState: SignupUserPayload | SignupFormState = useMemo(
    () => ({
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      address: null,
    }),
    []
  );
  const [errors, setErrors] = useState(formInitialState);
  const [formState, setFormState] = useState(formInitialState);
  const [loading, setLoading] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('SIGN IN');
  const [signupError, setSignupError] =
    useState<SignupFormState>(formInitialState);
  const { setAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      setSubmitButtonText('Loading...');
      setErrors(formInitialState);
      setSignupError(formInitialState);
    } else {
      setSubmitButtonText('SIGN UP');
    }
    if (Object.keys(signupError).length > 0) {
      setErrors({ ...signupError });
    }
  }, [formInitialState, loading, signupError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { hasErrors, validationErrors } = signupValidation(formState);
    if (hasErrors) {
      setErrors(validationErrors);
    } else {
      if (Object.keys(signupError).length === 0) {
        setSignupError(formInitialState);
      }
      setErrors(formInitialState);
      setLoading(true);
      signupUser(formState)
        .then((response) => {
          const { statusCode, message, data } = response;
          console.log(response);
          if (statusCode >= 200 && statusCode <= 202) {
            ToastSuccess({ message });
            saveAuth(data);
            setAuthUser(data);
            router.replace('/');
          } else if (statusCode >= 400 && statusCode <= 505) {
            setSignupError(message);
            ToastError({ message: 'An error occurred' });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log('Error', err);
          setLoading(false);
        });
    }
  };
  return (
    <GeneralLayout>
      <main className='w-full h-screen py-4'>
        <section className=''>
          <div className='w-full max-w-lg m-auto'>
            <Form method='POST' handleSubmit={handleSubmit} title='Sign Up'>
              {Object.keys(signupError).length > 0 && (
                <div className='py-3 text-red-500 border-b border-gray-300'>
                  {Object.keys(signupError).map((key) => {
                    return (
                      <div key={key}>
                        {Array.isArray(signupError[key]) &&
                          signupError[key].map((value: string) => {
                            return <span key={value}>{value}</span>;
                          })}
                      </div>
                    );
                  })}
                </div>
              )}
              <section className='grid gap-6 overflow-y-auto max-h-96 py-2 rounded shadow-inner'>
                <Input
                  name='firstName'
                  required={true}
                  label={'First Name'}
                  type='text'
                  error={errors.firstName != null}
                  errorText={errors.lastName}
                  handleChange={(e: InputChangeEvent) => {
                    setFormState({
                      ...formState,
                      firstName: e.target.value,
                    });
                  }}
                />
                <Input
                  name='lastName'
                  required={true}
                  label={'Last Name'}
                  type='text'
                  error={errors.lastName != null}
                  errorText={errors.lastName}
                  handleChange={(e: InputChangeEvent) => {
                    setFormState({
                      ...formState,
                      lastName: e.target.value,
                    });
                  }}
                />
                <Input
                  name='phoneNumber'
                  required={true}
                  label={'Phone Number'}
                  type='tel'
                  error={errors.phoneNumber != null}
                  errorText={errors.phoneNumber}
                  handleChange={(e: InputChangeEvent) => {
                    setFormState({
                      ...formState,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
                <Input
                  name='address'
                  required={true}
                  label={'Address'}
                  type='text'
                  error={errors.address != null}
                  errorText={errors.address}
                  handleChange={(e: InputChangeEvent) => {
                    setFormState({
                      ...formState,
                      address: e.target.value,
                    });
                  }}
                />
                <Input
                  name='email'
                  required={true}
                  label={'Email'}
                  type='text'
                  error={errors.email != null}
                  errorText={errors.email}
                  handleChange={(e: InputChangeEvent) => {
                    setFormState({
                      ...formState,
                      email: e.target.value,
                    });
                  }}
                />
                <PasswordInput
                  name='password'
                  required={true}
                  error={errors.password != null}
                  errorText={errors.password}
                  handleChange={(e: InputChangeEvent) => {
                    setFormState({
                      ...formState,
                      password: e.target.value,
                    });
                  }}
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

export default Signup;
