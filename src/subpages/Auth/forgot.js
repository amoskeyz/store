import React, { useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import useInput from 'hooks/useInput';
import Input from 'components/Input';
import data from 'data/forgot';
import { axiosInstance } from 'helpers';
import SubmitButton from 'components/submitbtn';

function Forgot() {
  const submitButton = useRef();
  const history = useRouter();
  const { addToast } = useToasts();

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
      const response = await axiosInstance.post('/user/forgot', inputs);
      if (response) {
        addToast(`A password reset link has been sent to your email`, {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      history.push('/signin');
    },
  });

  return (
    <div className="auth-section">
      <div className="reg-text">
        <h2>Forgot password</h2>
        <p>
          We'll send you a reset link{' '}
          <strong className="text-black cursor-pointer">or sign in</strong>
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
            handleChange={handleChange}
            validateSelf={validateSelf}
            setValidateSelf={setValidateSelf}
            valErrorMsg={form.valErrorMsg}
            attr={form.attr}
            open={true}
            example={form.example}
          />
        ))}

        <div className="text-center">
          <SubmitButton
            handleSubmit={handleSubmit}
            btnRef={submitButton}
            text={'Send Link'}
            loading={loading}
          />
        </div>

        <small className="externs block mt-5">
          Didn't get link{' '}
          <strong className="cursor-pointer" onClick={handleSubmit}>
            resend
          </strong>
        </small>
      </form>
    </div>
  );
}

export default Forgot;
