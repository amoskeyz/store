import Input from '../Input';
import Select from '../Select';
import CheckBox from '../CheckBox';
// import Radio from '../Radio';

const InputType = (props) => {
  return (
    <>
      {props.itype === 'select' && <Select {...props} />}
      {props.itype === 'checkbox' && <CheckBox {...props} />}
      {/* {props.itype === 'radio' && <Radio {...props} />} */}
      {!props.itype && <Input {...props} />}
    </>
  );
};

export default InputType;
