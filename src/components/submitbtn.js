import React from 'react';
import Button from 'components/Button';
import loader from 'images/loader.gif';

const SubmitButton = ({
  btnRef,
  handleSubmit,
  loading,
  text,
  className = '',
}) => {
  return (
    <Button btnRef={btnRef} onClick={handleSubmit} className={className}>
      <span className="inline-flex">
        {!loading && text}
        {loading && (
          <div className="relative w-5 h-5 ml-3">
            <img
              src={loader}
              alt="loading"
              className="w-10 h-10 object-cover block top-1/2 transform -translate-y-1/2 absolute"
            />
          </div>
        )}
      </span>
    </Button>
  );
};

export default SubmitButton;
