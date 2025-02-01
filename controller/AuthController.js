const AuthService = require("../service/AuthService");

exports.Login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkUser = await AuthService.isValidateUser(email, password);
        const newRefreshToken = await AuthService.newRefreshToken(checkUser);
        const newAccessToken = await AuthService.newAccessToken(checkUser, newRefreshToken);
        const setCookie = await AuthService.saveCookie(newRefreshToken, newAccessToken);
        return res.status(200).json({ message: "Login successful", data: userData });
    } catch (error) {
        console.log(error || "Server Error")
    }
}

// exports.Register = async (req, res) => {
//     const { name, email, password } = req.body;
//     const checkUser = await AuthService.registerNewUser(email, password);
// }