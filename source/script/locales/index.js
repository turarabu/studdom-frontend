import russian from './russian'
import english from './english'
import kazakh from './kazakh'

const locales = {}

export default parse([russian, english, kazakh])

function parse (langs) {
    var result = {}

    langs.forEach(lang => {
        let code = lang.locale.code
        result[code] = lang
    })

    return result
}