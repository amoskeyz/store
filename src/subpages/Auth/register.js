import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import Input from 'components/Input';
import useInput from 'hooks/useInput';
import data from 'data/signup';
import { axiosInstance } from 'helpers';
// import Social from '../SocialSec';
import { login } from 'g_actions/user';
import SubmitButton from 'components/submitbtn';

function Signup() {
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
    ,
    ,
    loading,
  ] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      if (inputs.password !== inputs.cpassword) {
        throw Error(`Please make sure that the passwords are the same`);
      }

      inputs.firstName = inputs.fullName.split(' ')[0];
      inputs.lastName = inputs.fullName.split(' ')[1];

      const data = Object.keys(inputs).reduce((acc, input) => {
        if (input === 'cpassword' || input === 'fullName') {
          return { ...acc };
        } else if (input === 'si_password') {
          return { ...acc, password: inputs[input] };
        } else return { ...acc, [input]: inputs[input] };
      }, {});

      const response = await axiosInstance.post('/user/signup', data);

      addToast(
        `Hey ${response.data.user.firstName} Welcome to Ayodele Jayne Lagos`,
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );

      dispatch(login());
      history.push('/');
    },
  });

  const revielPassword = (ref) => {
    setReviel(!reviel);
  };

  return (
    <div className="auth-section" id="signup">
      <div className="reg-text">
        <h2>Register</h2>
        <p>If you don’t have an account, register now!</p>
      </div>
      <form className="form">
        {data.map((form, i) => (
          <Input
            key={`login_form_${i}`}
            name={form.name}
            type={form.type}
            itype={form.itype}
            placeHolder={form.placeHolder}
            value={inputTypes[form.name]}
            errorMsg={form.errorMsg}
            required={form.required}
            reviel={form.type === 'password' ? reviel : false}
            revielPassword={revielPassword}
            handleChange={handleChange}
            validateSelf={validateSelf}
            showAsterix
            attr={form.attr}
            useSearch={form.name === 'country' || form.name === 'region'}
          />
        ))}

        <div className="text-center">
          <SubmitButton
            handleSubmit={handleSubmit}
            btnRef={submitButton}
            text={'Register'}
            loading={loading}
          />
        </div>
      </form>

      {/* <Social /> */}
    </div>
  );
}

export default Signup;
