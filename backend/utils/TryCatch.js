const TryCatch = (handler) => {
    return async(req, res, next) =>{
        try{
            await handler(req, res, next);

        }
        catch(error){
            res.status(500).json({
                Message: error.message
            });
        }
    }
};

export default TryCatch;