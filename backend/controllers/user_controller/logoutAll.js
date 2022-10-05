exports.logoutAll = async (req, res, next) => {
    try {
        req.user.tokens = []
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