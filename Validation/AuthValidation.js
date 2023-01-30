import {body} from 'express-validator'

export const registerValidator = [
    body('email', 'Неверно указана почта').isEmail(),
    body('password', 'Пароль не должен быть 8 символов').isLength({min: 8}),
    body('fullName', 'Имя не должно быть короче 3 символов').isLength({min:3}),
    body('lastName', 'Фамилия не может быть короче 4 символов').isLength({min:4}),
]