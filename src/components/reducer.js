function reducer(values = [], action) {
  switch (action.type) {
    case "inputChange":
      return [
        ...values,
        {
          formValues: action.payload,
        },
      ];

    default:
      return values;
  }
}

export default reducer;
