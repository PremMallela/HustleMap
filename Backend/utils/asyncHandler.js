const asyncHandler = (fn) => (req, res, next) => {
  
    Promise.resolve(fn(req, res, next)).then( console.log("Request Body:", req.body)).catch((error) => {
      return next(error); 
    });
  };
  
  export default asyncHandler;