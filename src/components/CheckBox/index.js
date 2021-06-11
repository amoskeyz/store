import '../Input/style.scss';

const CheckBox = ({ handleChange, value, placeHolder, name }) => {
  return (
    <div className="input-div">
      <div className="input">
        <div className="input-con">
          <div className="p-2 pt-5 flex items-center">
            <input
              onChange={handleChange}
              data-test="checkbox"
              type="checkbox"
              className="check-input hidden"
              checked={value}
              id="input-type-checkbox"
              name={name}
            />
            <label
              className="flex cursor-pointer"
              htmlFor="input-type-checkbox"
            >
              <span className="checkbox-label w-5 h-5 border-2 mr-5 border-txt rounded-full relative create-team-label inline-block" />
              <span>{placeHolder}</span>
            </label>

            <div className="el-spans">
              <span className="grow absolute w-full bottom-0 left-0 origin-left" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
