const data = [
  {
    name: 'title',
    placeHolder: 'Title',
    errorMsg: 'invalid a valid name',
    valErrorMsg: 'Please enter title',
    required: true,
    example: 'Product Title',
  },
  {
    name: 'description',
    placeHolder: 'Description',
    errorMsg: 'invalid a product description',
    valErrorMsg: 'Please enter a description',
    required: true,
    type: 'textarea',
    example: 'Product Description',
  },
  {
    name: 'category',
    placeHolder: 'Category',
    required: true,
    itype: 'select',
  },
  {
    name: 'subCategory',
    placeHolder: 'Sub Category',
    required: true,
    itype: 'select',
  },
  {
    name: 'type',
    placeHolder: 'Type',
    required: true,
    itype: 'select',
  },
  {
    name: 'quantity',
    placeHolder: 'Quantity',
    errorMsg: '',
    valErrorMsg: 'Please enter quantity',
    required: true,
    type: 'number',
  },
  {
    name: 'cost',
    placeHolder: 'Price',
    errorMsg: '',
    valErrorMsg: 'Please enter quantity',
    required: true,
    type: 'number',
  },
  {
    name: 'discount',
    placeHolder: 'Discount (%)',
    errorMsg: '',
    valErrorMsg: 'Please enter discount',
    type: 'number',
  },
  {
    name: 'featured',
    placeHolder: 'Featured Item',
    errorMsg: '',
    itype: 'checkbox',
  },
];

export default data;
