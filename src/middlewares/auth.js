const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        next()
       // res.status(401).json({error:"Por favor inicia sesion"})
    }
}

export default isAuth;