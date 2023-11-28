import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import bigData from '../../data/mock-data.json'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';


const SignupSchema = Yup.object().shape({
    nameSurname: Yup.string()
        .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ ]*$/, "Number is not allowed!")
        .min(2, 'at least 2 letters!')
        .max(60, 'max 60 letters!')
        .required('Required'),
    country: Yup.string()
        .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ ]*$/, "Number is not allowed!")
        .min(2, 'at least 2 letters!')
        .max(40, 'max 40 letters!')
        .required('Required'),
    city: Yup.string()
        .matches(/^[a-zA-ZğüşöçıİĞÜŞÖÇ ]*$/, "Number is not allowed!")
        .min(2, 'at least 2 letters!')
        .max(40, 'max 40 letters!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    website: Yup.string()
        .matches(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm, 'URL is not valid').required('Required')

});

const submitHandler = (values) => {

    const foundItemsLocalStorage = JSON.parse((localStorage.getItem('items')));
    const foundCols = foundItemsLocalStorage.cols;
    const foundItems = foundItemsLocalStorage.data;

    const itemList = foundItems.map((item, i) => {
        let obj = {};
        foundCols.forEach((col, coli) => obj[col] = item[coli]);
        return obj;
    })
    const newId = Math.max(...itemList.map(o => o.id)) + 1;
    let newRecord = [
        newId,
        values.nameSurname,
        "COMPANY",
        values.email,
        "PHONE",
        values.website,
        values.country,
        values.city,
        new Date().toLocaleDateString("en")
    ];
    foundItemsLocalStorage.data.push(newRecord);

    localStorage.setItem("items", JSON.stringify(foundItemsLocalStorage));
    toast.success('Data added', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
    })
    const inputs = document.querySelectorAll("input");
    inputs.forEach(inp =>
        inp.value = '')
}

function AddLink() {

    useEffect(() => {


        if (localStorage.getItem("items") != null) return

        localStorage.setItem("items", JSON.stringify(bigData))
        // console.log("çalıştı")

        // const options = {
        //     method: 'GET',
        //     url: 'http://ulvis.net/API/write/get',
        //     params: {
        //         url: 'https://www.google.com',

        //     },
        //     headers: {
        //         url: 'https://www.google.com',
        //         'X-RapidAPI-Key': 'feb8f213fdmshf4fb9d583b9b887p1cee90jsn6aa941bc64eb',
        //         'X-RapidAPI-Host': 'free-url-shortener.p.rapidapi.com'
        //     }
        // };

        // axios.request(options).then((res) => {
        //     console.log(res)
        // }).catch((er) => {
        //     console.log(er)

        // });

    }, [])


    return (
        <div id='add-link-page-holder'>
            <div className='container-fluid p-5 pb-0'>
                <div className='row row-gap-5'>
                    <div className='col-12 col-lg-2'>
                        <Link to="/">
                            <img src="/img/logo.webp" width="200" />
                        </Link>
                    </div>
                    <div className='col-12 col-lg-5 '>
                        <div className='d-flex flex-column gap-5 justify-content-center'>
                            <Link to="/searchresults" className='back-to-list'>
                                <i className="bi bi-arrow-left"></i> Return to list page
                            </Link>
                            <div className='mt-lg-5'>
                                <Formik
                                    isInitialValid={false}
                                    initialValues={{
                                        nameSurname: '',
                                        country: '',
                                        city: '',
                                        email: '',
                                        website: ''
                                    }}
                                    validationSchema={SignupSchema}
                                    onSubmit={(value) => { submitHandler(value) }}
                                >
                                    {({ isValid, errors, touched }) => (
                                        <Form>
                                            <div className={errors.nameSurname && touched.nameSurname ? 'form-error form-group' : 'form-group'} >
                                                <label  >Name</label>
                                                <Field id="nameSurname" name="nameSurname" placeholder="Enter name and surname" />
                                                {errors.nameSurname && touched.nameSurname ?
                                                    (<span>{errors.nameSurname}</span>)
                                                    : null}
                                            </div>

                                            <div className={errors.country && touched.country ? 'form-error form-group' : 'form-group'} >
                                                <label  >Country</label>
                                                <Field id="country" name="country" className={errors.country && touched.country ? 'form-error' : ''} />
                                                {errors.country && touched.country ?
                                                    (<span>{errors.country}</span>)
                                                    : null}
                                            </div>
                                            <div className={errors.city && touched.City ? 'form-error form-group' : 'form-group'} >
                                                <label >city</label>
                                                <Field id="city" name="city" className={errors.city && touched.city ? 'form-error' : ''} />
                                                {errors.city && touched.city ?
                                                    (<span>{errors.city}</span>)
                                                    : null}
                                            </div>


                                            <div className={errors.email && touched.email ? 'form-error form-group' : 'form-group'} >
                                                <label  >Email</label>
                                                <Field id="email" name="email" className={errors.email && touched.email ? 'form-error' : ''} />
                                                {errors.email && touched.email ?
                                                    (<span>{errors.email}</span>)
                                                    : null}
                                            </div>

                                            <div className={errors.website && touched.website ? 'form-error form-group' : 'form-group'} >
                                                <label  >website</label>
                                                <Field id="website" name="website" className={errors.website && touched.website ? 'form-error' : ''} />
                                                {errors.website && touched.website ?
                                                    (<span>{errors.website}</span>)
                                                    : null}
                                            </div>

                                            <button className={isValid ? 'btn-link' : 'btn-link-disabled'} disabled={isValid ? false : true} type="submit">Add</button>

                                        </Form>

                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddLink