
export const verifyToken = (req, res, next) => {
    let authHeader = req.header('authorization');
    if (authHeader !== undefined) {
        req.token = authHeader.split(' ')[1];
        next();
    } else {
        res.status(403).send({
            status: 0,
            message: 'You do not have access to this content'
        });
    }
}