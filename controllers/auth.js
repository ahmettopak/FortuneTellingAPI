const Auth = require('../models/auth.js')
const jwt = require('jsonwebtoken')

//Otp settings
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { fullname, gender, dateOfBirth, email, password } = req.body
        const userEmail = await Auth.findOne({ email })

        if (userEmail) {
            return res.status(500).json({ message: "Bu email hesabı zaten bulunmakta !!" })
        }

        if (password.length < 6) {
            return res.status(500).json({ message: "Parolanız 6 karakterden kücük olmamalı..." })
        }
        // const passwordHash = await (bcrypt.hashpassword, password)


        const newUser = await Auth.create({ fullname, gender, dateOfBirth, email, password })
        //const userToken = await jwt.sign({ id: newUser.id }, process.env.SECRET_,TOKEN, { expiresIn: '1h' });
        res.status(200).json({
            status: "OK",
            newUser,

        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: "Böyle bir kullanıcı bulunamadı..." })
        }
        // const comparePassword = await bcrypt.compare(password, user.password)
        if (!(password == user.password)) {
            return res.status(500).json({ message: "Parolanız yanlısss...." })
        }
        //const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
        // res.status(200).json(
        //     //status = "OK",
        //     //user,
        //     "Login Success"
        //     //token
        // )

        const otp = generateOTP();
        sendOTP(email, otp);

        res.status(200).json({ message: otp, user });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await Auth.findOne({ email, username });
        if (!user) {
            return res.status(500).json({ message: "Böyle bir kullanıcı bulunamadı..." })
        }
        if (user.password == password) {
            await Auth.deleteOne({ email })
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
        res.status(200).json(
            status = "OK",
            user,
            token
        )
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const otp = async (req, res) => {
    try {
        // Kullanıcıya OTP kodunu gönderme
        const { email } = req.body;

        const otp = generateOTP();
        sendOTP(email, otp);

        res.json({ message: otp });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



// OTP kodu oluşturma
function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

// E-posta gönderme fonksiyonu
function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'Hotmail', // E-posta sağlayıcınıza göre değiştirin
        auth: {
            user: process.env.EMAIL, // E-posta adresinizi buraya girin
            pass: process.env.EMAIL_PASS // E-posta şifrenizi buraya girin
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP Kodu',
        text: `Coffe Time için OTP Kodunuz: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('E-posta gönderildi: ' + info.response);
        }
    });
}





module.exports = { register, login, deleteUser, otp }