
exports.logoutUser = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send({
            success: true,
            message: 'Logout successfully'
        })
    }
    catch (err) {
        next(err)
    }
}