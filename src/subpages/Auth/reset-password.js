import React, { useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import useInput from 'hooks/useInput';
import Input from 'components/Input';
import data from 'data/reset';
import { axiosInstance } from 'helpers';
import SubmitButton from '../../components/submitbtn';

function Forgot() {
  const submitButton = useRef();
  const { addToast } = useToasts();
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
      if (inputs.password !== inputs.cpassword) {
        addToast(`Please make sure that the passwords are the same`, {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 10000,
        });
        submitButton.current.disabled = false;
        return;
      }

      const data = Object.keys(inputs).reduce((acc, input) => {
        if (input !== 'cpassword') {
          return { ...acc, [input]: inputs[input] };
        }
        return { ...acc };
      }, {});

      const response = await axiosInstance.post(
        `/user/change-password${location.search}`,
        data
      );

      if (response) {
        addToast('Successfull updated', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/signin');
      }
    },
  });

  return (
    <div className="auth-section">
      <div className="reg-text">
        <h2>Reset password</h2>
        <p>One last step</p>
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
            text={'Reset'}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default Forgot;
