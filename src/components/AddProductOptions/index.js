import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { useToasts } from 'react-toast-notifications';
import CheckMark from 'assets/icons/checkmark';
import DropeDown from 'components/RevielDrop';
import Close from 'assets/icons/close';
import Plus from 'assets/icons/plus';
import Input from 'components/InputType';

const AddProductOptions = ({ options, setOptions, quantity }) => {
  const [intermidiateColor, setIntermediateColor] = useState();
  const { addToast } = useToasts();

  const addNew = () => {
    setOptions([
      ...options,
      { id: Math.ceil(Math.random() * 10000), name: '', list: [] },
    ]);
  };

  useEffect(() => {
    if (!isNaN(quantity)) return;

    if (quantity <= 0) {
      setOptions((prevOpt) =>
        prevOpt.map((opt) => {
          if (opt.name.toLowerCase() === 'size') {
            return { ...opt, list: [] };
          }
        })
      );
    }
  }, [quantity]);

  const addOption = (id, color, name) => {
    const optionName = name.toLowerCase();

    const value =
      optionName !== 'color'
        ? document.querySelector('#option-input').value
        : color;

    if (!value) return;

    if (optionName === 'size') {
      if (Number(quantity) === 0) {
        if (!value.split(':')[1]) {
          return addToast('Please add a quantity for the option', {
            appearance: 'warning',
            autoDismiss: true,
          });
        }
      }
    }

    setOptions((options) =>
      options.map((p_option) => {
        if (p_option.id === id) {
          return {
            ...p_option,
            list: [...p_option.list, { option: value }],
          };
        }
        return p_option;
      })
    );

    if (!color) document.querySelector('#option-input').value = '';
  };

  const nameOption = (e, option) => {
    setOptions((options) =>
      options.map((p_option) => {
        if (p_option.id === option.id) {
          if (e.target.name === 'name') {
            return { ...p_option, name: e.target.value };
          }
        }
        return p_option;
      })
    );
  };

  const removeOption = (id) => {
    setOptions((options) => options.filter((p_option) => p_option.id !== id));
  };

  const removeOptionList = (id, ls_rm) => {
    setOptions((options) =>
      options.map((p_option) => {
        if (p_option.id === id) {
          return {
            ...p_option,
            list: p_option.list.filter((ls) => ls.option !== ls_rm.option),
          };
        }
        return p_option;
      })
    );
  };

  const getOptionName = (name) => {
    if (name.toLowerCase() === 'size') {
      return quantity <= 0 ? 'Option:Quantity' : 'Option';
    }
    return 'Option';
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl mb-3">Add Product Options</h3>

      <div className="flex flex-wrap">
        <span
          className="bg-txt-lt p-2 cursor-pointer mr-5 mb-3 w-10 h-10 flex-shrink"
          onClick={addNew}
        >
          <Plus className="fill-current text-txt-t w-6 h-6" />
        </span>

        <div className="flex-grow flex flex-wrap justify-between">
          {options?.map((option) => (
            <div
              key={option.id}
              className="options-form--con w-full md:w-49/100 relative"
            >
              <button
                className="close bg-txt w-8 h-8 absolute -top-2.5 -right-2.5 flex-center rounded-full invisible transition-all duration-300 opacity-0"
                onClick={() => removeOption(option.id)}
              >
                <Close className="w-5 h-5 fill-current text-white" />
              </button>
              <div className="options-form bg-gray-50 mb-3 p-2">
                <Input
                  name="name"
                  placeHolder="Name"
                  example="example color"
                  handleChange={(e) => nameOption(e, option)}
                />
                <div className="flex items-start justify-between mt-5 py-3">
                  <h5>Add</h5>
                  <form className="w-2/3 flex justify-end">
                    {option.name.toLowerCase() === 'color' ? (
                      <>
                        <DropeDown
                          revielType="hover"
                          header={
                            <div className="flex">
                              <p className="text-right">Pick Color</p>
                              <span
                                className="w-5 h-5 rounded-full inline-block ml-3"
                                style={{ background: intermidiateColor }}
                              />
                            </div>
                          }
                        >
                          <SketchPicker
                            onChangeComplete={(e) => {
                              setIntermediateColor(e.hex);
                            }}
                            color={intermidiateColor}
                          />
                        </DropeDown>

                        <button
                          className="w-8 h-8 ml-10"
                          onClick={(e) => {
                            e.preventDefault();
                            addOption(
                              option.id,
                              intermidiateColor,
                              option.name
                            );
                          }}
                        >
                          <CheckMark className="w-4/5 h-auto" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Input
                          name="option"
                          attr={{ id: 'option-input' }}
                          placeHolder={getOptionName(option.name)}
                        />

                        <button
                          className="w-8 h-8 ml-10"
                          onClick={(e) => {
                            e.preventDefault();
                            addOption(option.id, null, option.name);
                          }}
                        >
                          <CheckMark className="w-4/5 h-auto" />
                        </button>
                      </>
                    )}
                  </form>
                </div>
                <div className="list-none flex items-start justify-between mt-5 py-3">
                  <h5>Options</h5>
                  <ul className="w-2/3 flex items-center flex-wrap -m-3">
                    {option.list.map((ls) =>
                      option.name.toLowerCase() === 'color' ? (
                        <li
                          key={ls.option}
                          style={{ backgroundColor: ls.option }}
                          className="m-3 w-8 h-8 rounded-full"
                          onClick={() => removeOptionList(option.id, ls)}
                        />
                      ) : (
                        <li
                          key={ls.option}
                          className="p-3"
                          onClick={() => removeOptionList(option.id, ls)}
                        >
                          {ls.option}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductOptions;
