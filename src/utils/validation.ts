const validationSchema = {
  seedPhrase: {
    required: { value: true, message: 'Phrase is required' },
    pattern: {
      value: /^([a-z]+(\s|\.|-|\/)){11}[a-z]+$/,
      message: 'Phrase is invalid',
    },
  },
  address: {
    required: { value: true, message: 'Address is required' },
    pattern: { value: /^0x[a-fA-F0-9]{40}$/, message: 'Address is invalid' },
  },
  amount: {
    required: { value: true, message: 'Amount is required' },
    pattern: { value: /^\d+(\.\d+)?$/, message: 'Amount is invalid' },
  },
}

export default validationSchema
