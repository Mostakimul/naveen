export const modifyPayload = (values) => {
  console.log('values', values);
  const obj = { ...values };
  const file = obj['invoiceImage'];
  delete obj['invoiceImage'];
  delete obj['invoiceImage'];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append('data', data);
  formData.append('file', file);

  return formData;
};
