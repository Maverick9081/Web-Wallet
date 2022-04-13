import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const verifyToken = async (req,res,next) => {
    
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')[1];

        try{
            const user = jwt.verify(bearer, process.env.JWT_PRIVATE_KEY);
                if(!user){
                    res.status(403)
                        .send('Yor are not logged in or User timeOut');
                    return;
                }
        }
        catch(error){
            console.log(error);
        }
        next();
    }
}

export const isAdmin = async (req,res,next) => {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];
        try {
            const user = jwt.verify(bearerToken,process.env.JWT_PRIVATE_KEY);
            if(user.role !== "1") {
                res.status(401)
                    .send('Not authorized');
                return;
            }
        }
        catch(error){
            console.log(error);
        }
        next();
    }
}