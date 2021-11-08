export default function Validator(formSelector) {
    var _this = this
    var formRules = {}

    var formElement = document.querySelector(formSelector)
    var formGroupSelector = '.form-group'
    var errorSelector = '.form-message'
    var passwordSelector = '#password' || '#password2'

    var ValidatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        isEmail: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập email hợp lệ cho trường này'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        },
        getConfirmed: function(value) {
            var passwordValue = formElement.querySelector(passwordSelector).value
            return value === passwordValue ? undefined : 'Vui lòng nhập lại mật khẩu chính xác'
        }
    }

    if (formElement) {
        var inputElements = formElement.querySelectorAll('[name][rules]')
        for (var inputElement of inputElements) {
            var rules = inputElement.getAttribute('rules').split('|')
            for (var rule of rules) {
                var isRealTwoRule = rule.includes(':')
                var lastRule

                if (isRealTwoRule) {
                    var splitTwoRule = rule.split(':')
                    rule = splitTwoRule[0]
                    lastRule = splitTwoRule[1]
                }

                var funcRule = ValidatorRules[rule]

                if (isRealTwoRule) {
                    funcRule = funcRule(lastRule)
                }
                
                if (Array.isArray(formRules[inputElement.name])) {
                    formRules[inputElement.name].push(funcRule)
                } else if (!formRules[inputElement.name]) {
                    formRules[inputElement.name] = [funcRule]
                }
            }

            inputElement.onblur = handleValidate
            inputElement.oninput = handleClearError
        }
    }

    function handleValidate(e) {
        const input = e.target
        const {name,value} = input 

        const formGroupElement = input.closest(formGroupSelector)
        const errorElement = formGroupElement.querySelector(errorSelector)
        var errorMessage

        var rules = formRules[name]
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](value)
            if (errorMessage) break
        }

        if (errorMessage) {
            formGroupElement.classList.add('invalid')
            errorElement.innerText = errorMessage
        } else {
            formGroupElement.classList.remove('invalid')
            errorElement.innerText = ''
        }

        return !errorMessage
    }
    
    function handleClearError(e) {
        const input = e.target

        const formGroupElement = input.closest(formGroupSelector)
        const errorElement = formGroupElement.querySelector(errorSelector)

        formGroupElement.classList.remove('invalid')
        errorElement.innerText = ''
    }

    formElement.onsubmit = (e) => {
        e.preventDefault()
        var isRealValid = true
        var inputElements = formElement.querySelectorAll('[name][rules]')

        for (var inputElement of inputElements) {
            var errorMessage = handleValidate({target: inputElement})
            if (!errorMessage) {
                isRealValid = false
            }
        }

        if (isRealValid) {
            if (typeof _this.onSubmit === 'function') {
                var formValues = Array.from(inputElements).reduce((formValues,input) => {
                    formValues[input.name] = input.value
                    return formValues
                }, {})

                _this.onSubmit(formValues)
            } else {
                formElement.submit()
            }
        }
    }
}

