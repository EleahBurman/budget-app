import jsonwebtoken from 'jsonwebtoken';

export const decodeCookie = async (req, res, next) => {

  if(req.cookies['refreshToken']){

    await jsonwebtoken.verify( 
      req.cookies['refreshToken'],
      process.env.ACCESS_TOKEN_SECRET,
      async function(err, decoded) {
        req.user = {
          id: decoded.user.id,
          userName: decoded.user.username,
          email: decoded.user.email
        }
        next();
      }
    )

  } else {
    res.json({
      message: "access denied"
    })
  }

}