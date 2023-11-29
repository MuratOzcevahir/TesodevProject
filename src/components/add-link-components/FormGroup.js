import { Field } from 'formik'
import React from 'react'

function FormGroup(prop) {
    return (
        <div className={prop.error && prop.touched ? 'form-error form-group' : 'form-group'} >
            <label style={{textTransform:"capitalize"}}>{prop.name}</label>
            <Field id={prop.name} name={prop.name} placeholder={prop.placeholder} />
            {prop.error && prop.touched ?
                (<span>{prop.error}</span>)
                : null}
        </div>
    )
}

export default FormGroup