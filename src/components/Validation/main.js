export const Validator = (options) => {
    let formRule = {}

    const formElement = document.querySelector(options.formSelector)
    
    options.rules.forEach(function(rule) {
   
        // Lập object với key là selector - value là các rule của selector đó
        if(Array.isArray(formRule[rule.selector])) {
            formRule[rule.selector].push(rule.test)
        } else {
            formRule[rule.selector] = [rule.test]
        }


        const inputElements = formElement.querySelectorAll(rule.selector)
        console.log(inputElements)

        for(let inputElement of inputElements) {
            inputElement.addEventListener('blur', function() {
                Validate(inputElement, rule)
            } ) 
    
            inputElement.addEventListener('input', function() {
                var formGroupElement = inputElement.closest(options.formGroupSelector)
                var errorElement = formGroupElement.querySelector(options.errorSelector)
    
                errorElement.innerText = ''
                formGroupElement.classList.remove('invalid')
            } )
        }
        


    })


    // Validate input
    const  Validate = (inputElement, rule) => {
        var errorMessage
        var formGroupElement = inputElement.closest(options.formGroupSelector)
        var errorElement = formGroupElement.querySelector(options.errorSelector)

        var rules = formRule[rule.selector]
        for (var i = 0; i < rules.length ; i++) {
            switch(inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage
            formGroupElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            formGroupElement.classList.remove('invalid')
        }
        return !errorMessage
    }

    // Xử lý onsubmit
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault()
            var isValid = true

            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector)

                var isRealValid = Validate(inputElement,rule)
                if (!isRealValid) {
                    isValid = false
                }
            })

            if (isValid) {
                if(typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')

                    var formValue = Array.from(enableInputs).reduce((value, input) => {
                        switch(input.type) {
                            case 'radio':
                                if(input.matches(':checked')) {
                                    value[input.name] = input.value
                                } else if (!value[input.name]) {
                                    value[input.name] = ''
                                }
                                break
                            case 'checkbox':
                                if(input.matches(':checked')) {
                                    if(!Array.isArray(value[input.name])) {
                                        value[input.name] = []
                                    }
                                    value[input.name].push(input.value)
                                } else if (!value[input.name]) {
                                    value[input.name] = ''
                                }
                                break
                            case 'file':
                                value[input.name] = input.files
                                break
                            default:
                                value[input.name] = input.value
                        }
                        return value
                    }, {})

                    options.onSubmit(formValue)
                } else {
                    formElement.submit()
                }
            }

        })
    }

}




// Rules

export const ValidatorRequired = (selector, message) => {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

export const ValidatorIsEmail = (selector) => {
    return {
        selector: selector,
        test: function(value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập email cho trường này'
        }
    }
}

export const ValidatorMinLength = (selector, min) => {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}

export const ValidatorConfirmed = (selector, getConFirmed, message) => {
    return {
        selector: selector,
        test: function(value) {
            return value === getConFirmed() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}



export const ValidatorMinQuantity = (selector, min) => {
    return {
        selector: selector,
        test: function(value) {
            return value >= min ? undefined : `Vui lòng chọn mua tối thiểu ${min} sản phẩm`
        }
    }
}