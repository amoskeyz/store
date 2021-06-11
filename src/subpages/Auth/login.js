import React, { useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';
import Input from 'components/Input';
import data from 'data/signIn';
import { axiosInstance } from 'helpers';
import { login } from 'g_actions/user';
import { getAllCartItems } from 'g_actions/cart';
import SubmitButton from 'components/submitbtn';

function Login() {
  const submitButton = useRef();
  const [reviel, setReviel] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useRouter();

  const [
    handleSubmit,
    handleChange,
    inputTypes,
    validateSelf,
    setValidateSelf,
    ,
    loading,
  ] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      const response = await axiosInstance.post('/user/login', inputs);

      addToast(`Welcome back ${response.data.user.firstName}`, {
        appearance: 'success',
        autoDismiss: true,
      });

      dispatch(login(response));
      dispatch(getAllCartItems(true));

      response.data.user.role === 'admin'
        ? history.push('/admin')
        : history.push('/');
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  const showSignup = () => {
    document.querySelector('#signup').scrollIntoView();
  };

  return (
    <div className="auth-section">
      <div className="reg-text">
        <h2>Login</h2>
        <p>
          Great to have you back{' '}
          <strong
            className="text-black cursor-pointer lg:hidden"
            onClick={showSignup}
          >
            / sign up
          </strong>
        </p>
      </div>
      <form className="form">
        {data.map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            placeHolder={form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            reviel={form.type === 'password' ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
            setValidateSelf={setValidateSelf}
            valErrorMsg={form.valErrorMsg}
            attr={form.attr}
            open={true}
            example={form.example}
          />
        ))}

        <SubmitButton
          handleSubmit={handleSubmit}
          btnRef={submitButton}
          text={'Login'}
          loading={loading}
        />

        <small className="externs block mt-5">
          <Link href="/forgot">
            <a>Lost your password?</a>
          </Link>
        </small>
      </form>
    </div>
  );
}

export default Login;
