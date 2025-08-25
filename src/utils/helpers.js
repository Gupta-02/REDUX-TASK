export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'An unknown error occurred.';
};