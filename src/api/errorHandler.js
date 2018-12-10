export default function errorHandler(error){
  if(IS_DEV) console.error('[API]: ' + error);

  const response = error.response;
  const responseError = response ? response.data.error : 'Network Error';

  // e.g. display <responseError.message>;

  return Promise.reject(error);
}
