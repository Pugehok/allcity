import {body} from 'express-validator'

export  const postCreateValidator = [
    body('title', 'Введите название места').isLength({min:3}).isString(),
    body('text', 'Введите описание места').isLength({min:10}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isArray(),
    body('imgaeUrl', 'Неверный формат изоброжения').optional().isString(),
]