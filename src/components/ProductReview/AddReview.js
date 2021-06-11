import React, { useRef, useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import ReactStars from 'react-rating-stars-component';
import useInput from 'hooks/useInput';
import Input from 'components/Input';
import data from 'data/review';
import { axiosInstance } from 'helpers';
import SubmitButton from 'components/submitbtn';

function AddReview({ setReview, currentReview, productId }) {
  const submitButton = useRef();
  const [key, setKey] = useState(Math.floor(Math.random() * 33244));
  const { addToast } = useToasts();

  const [
    handleSubmit,
    handleChange,
    inputTypes,
    validateSelf,
    setValidateSelf,
    setInputTypes,
    loading,
  ] = useInput({
    inputs: data,
    submitButton,
    cb: async (inputs) => {
      const { review, rating } = inputs;

      const method = currentReview ? 'patch' : 'post';
      const slug = currentReview ? `review/${productId}` : '/review/create';

      const response = await axiosInstance[method](slug, {
        rating,
        review: review ? review : undefined,
        productId: currentReview ? undefined : productId,
      });

      addToast(
        currentReview
          ? 'Your review has been updated'
          : 'Your review has been added',
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );

      reset();

      currentReview
        ? setReview((prevData) => ({
            ...prevData,
            data: prevData.data.map((dt) => {
              if (dt.id === currentReview.id) {
                return { ...currentReview, ...inputs };
              }

              return dt;
            }),
          }))
        : setReview((prevData) => ({
            ...prevData,
            data: [response.data.data, ...prevData.data],
          }));
    },
  });

  useEffect(() => {
    if (!currentReview) return;
    setInputTypes({
      review: currentReview.review,
      rating: currentReview.rating,
    });
  }, [currentReview]);

  function reset() {
    setKey(Math.floor(Math.random() * 33244999));
    setInputTypes({
      review: '',
      rating: 0,
    });
  }

  return (
    <div className="auth-section" id="review-sec" key={key}>
      <div className="reg-text">
        <h2>Add a review</h2>{' '}
        {currentReview ? <button onClick={reset}>Reset</button> : ''}
      </div>
      <form className="form">
        <div className="flex">
          <p className="px-2 mr-3 text-txt">Your Rating</p>
          <ReactStars
            count={5}
            onChange={(r) =>
              handleChange({ target: { name: 'rating', value: r } })
            }
            size={15}
            activeColor="#ffd700"
            isHalf={true}
            value={inputTypes.rating || 0}
            key={inputTypes.rating}
          />
        </div>

        {data.slice(0, 1).map((form, i) => (
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

        <div className="flex-center">
          <SubmitButton
            handleSubmit={handleSubmit}
            btnRef={submitButton}
            text={currentReview ? 'Edit' : 'Submit'}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default AddReview;
