const sendToken = (user, statusCode, res,msg) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'None' // Required for cross-site cookies
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
        msg
    });
}

module.exports = sendToken;