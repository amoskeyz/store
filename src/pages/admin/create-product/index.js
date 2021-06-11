import React, { useRef, useState, useEffect } from 'react';
import Layout from 'layouts/PageSectionWithSide';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { createProduct } from 'g_actions/product';
import Nav from 'components/SideNav';
import bnrImg from 'images/create.jpg';
import useInput from 'hooks/useInput';
import Input from 'components/InputType';
import data from 'data/createProduct';
import SubmitButton from 'components/submitbtn';
import Button from 'components/Button';
import AddProductOptions from 'components/AddProductOptions';
import ChooseImages from 'components/ChooseImages';
import AddTags from 'components/AddTags';
import useFetch from 'hooks/useFetch';
import { getSingleProduct } from 'g_actions/product';

const CreateProduct = () => {
  const submitButton = useRef();
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [productCreated, setProductCreated] = useState();
  const [options, setOptions] = useState([]);
  const presets = useSelector((state) => state.presets);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { indexedProducts } = useSelector((state) => state.product);
  const [key, setKey] = useState('mx_key');

  const router = useRouter();

  const {
    query: { edit },
  } = router;

  const editedProduct = indexedProducts[edit];
  const [loadProduct, , fetchProduct] = useFetch(
    dispatch,
    !editedProduct,
    true,
    'fetchProduct'
  );

  useEffect(() => {
    if (!edit) return;
    if (loadProduct) {
      fetchProduct(() => getSingleProduct(edit));
    }
  }, []);

  const categoryArray = presets?.shop.map((set) => ({
    name: set.title,
    value: set.title,
  }));

  const categoryObj = presets?.shop.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.title]: cur.types.map((ty) => ({ name: ty.title, value: ty.title })),
    };
  }, {});

  const typesArray = presets?.home[0].types.map((ty) => ({
    name: ty.title,
    value: ty.title,
  }));

  const selects = {
    category: categoryArray,
    subCategory: categoryObj,
    type: typesArray,
  };

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
    initials: { featured: false },
    cb: async (inputs) => {
      // remove unset data
      const neededdata = Object.keys(inputs).reduce((acc, input) => {
        if (inputs[input]) return { ...acc, [input]: inputs[input] };
        else return acc;
      }, {});

      const resp = await dispatch(
        createProduct(productCreated, {
          ...neededdata,
          options: options.map((option) => ({
            name: option.name,
            options: option.list.map((ls) => ls.option),
          })),
          tags: tags.map((tag) => tag.name),
        })
      );

      addToast(
        productCreated
          ? 'Product Successfully updated'
          : `Product Successfully created`,
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );

      if (!productCreated) {
        setProductCreated(resp.product.id);
      }
    },
  });

  useEffect(() => {
    if (!editedProduct) return;

    const options = JSON.parse(editedProduct.options);

    const {
      title,
      category,
      description,
      subCategory,
      type,
      quantity,
      cost,
      discount,
      featured,
    } = editedProduct;

    setTags(editedProduct.Tags);
    setImages(
      editedProduct?.images?.map((img) => ({
        img_id: Math.ceil(Math.random() * 909090878),
        file: img,
        link: img,
      })) || []
    );
    setProductCreated(editedProduct.id);
    setOptions(
      options.map((ot) => ({
        id: Math.ceil(Math.random() * 909090878),
        name: ot.name,
        list: ot.options.map((opt) => ({
          option: opt,
        })),
      }))
    );
    setInputTypes({
      title,
      category,
      description,
      subCategory,
      type,
      quantity: quantity.toString(),
      cost,
      discount,
      featured,
    });

    return () => {};
  }, [editedProduct]);

  const subCategory = inputTypes.category
    ? selects?.subCategory[inputTypes.category]
    : [];

  const resetComponent = () => {
    setProductCreated(null);
    setImages([]);
    setTags([]);
    setOptions([]);
    setInputTypes({
      title: '',
      description: '',
      category: '',
      subCategory: '',
      type: '',
      quantity: '',
      cost: '',
      discount: '',
      featured: false,
    });

    setKey(Math.floor(Math.random() * 3478909));
  };

  return (
    <Layout
      title={productCreated ? 'Update Product' : 'Create New Product'}
      image={bnrImg}
      navText="Navigation"
      floating={<Nav />}
      protect
      key={key}
    >
      <div className="auth-section">
        <div className="reg-text left">
          <h2>Create New Product</h2>
        </div>
        <div className="form">
          <div className="form-inputs">
            <div className="grid-form flex -mx-3.5 flex-wrap">
              {data.map((form, i) => (
                <Input
                  key={`create_product_${key}_${i}`}
                  name={form.name}
                  type={form.type}
                  placeHolder={form.placeHolder}
                  value={inputTypes[form.name]}
                  errorMsg={form.errorMsg}
                  required={form.required}
                  handleChange={handleChange}
                  handleSelect={handleChange}
                  validateSelf={validateSelf}
                  setValidateSelf={setValidateSelf}
                  valErrorMsg={form.valErrorMsg}
                  attr={form.attr}
                  open={true}
                  example={form.example}
                  itype={form.itype}
                  inputs={
                    form.name === 'subCategory'
                      ? subCategory
                      : selects[form.name]
                  }
                />
              ))}
            </div>
          </div>

          <AddProductOptions
            options={options}
            setOptions={setOptions}
            quantity={inputTypes.quantity}
          />

          <AddTags tags={tags} setTags={setTags} />

          {productCreated && (
            <ChooseImages
              images={images}
              setImages={setImages}
              productId={productCreated}
            />
          )}

          <div className="flex justify-end">
            <SubmitButton
              handleSubmit={handleSubmit}
              btnRef={submitButton}
              text={productCreated ? 'Update' : 'Create'}
              loading={loading}
            />
          </div>

          {productCreated && (
            <div className="flex justify-end mt-5">
              <div>
                <Button onClick={resetComponent}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
