
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react"

interface UseValidator {
    values: any
    errors: any
    handleChange: (e: ChangeEvent<HTMLInputElement> | any) => void
    handleSubmit: (e: FormEvent<HTMLInputElement> | any ) => void
    handleOnBlur: (e: ChangeEvent) => void
}

export const useValidator = (initialState : any , toValidate: any , submitFn : any ) : UseValidator  => {

    const [ values , setValues ] = useState(initialState)
    const [ errors , setErrors ] = useState({})
    const [ submitForm , setSubmitForm ] = useState(false)

    // hook that will be executed when the component is mounted and when the state changes
    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors) submitFn() 
            setSubmitForm(false);
        }
    }, [errors])

    // Function that is executed when the user writes something
    const handleChange = ( e : ChangeEvent<HTMLInputElement> ) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    //when user make submit
    const handleSubmit = ( e: FormEvent<HTMLInputElement> ) => {
        e.preventDefault();
        const validationErrors = toValidate(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    }

    //when user make blur
    const handleOnBlur = () =>{
        const validationErrors = toValidate(values);
        setErrors(validationErrors);
    }


  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleOnBlur
  }


}

export default useValidator
