export const errorHandler = (error) => {
  if (error.response) {
    if (error.response.data) {
      return error.response.data.message;
    } else {
      return error.response.statusText;
    }
  } else {
    return error.message;
  }
}