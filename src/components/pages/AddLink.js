import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import bigData from '../../data/mock-data.json'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import FormGroup from '../add-link-components/FormGroup';
import axios from 'axios';

//default value of new object
let defaultData = {
    nameSurname: '',
    country: '',
    city: '',
    email: '',
    website: ''
}
// creating validation schema by using yup
const NewRecordSchema = Yup.object().shape({
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
/** If pass the validation submit new data to localstorage
 * 
 * @param  values new object values
 */
const submitHandler = (values) => {

    const foundItemsLocalStorage = JSON.parse((localStorage.getItem('items')));
    const foundCols = foundItemsLocalStorage.cols;
    const foundItems = foundItemsLocalStorage.data;
    //cretes the new obj list from col and data array
    const itemList = foundItems.map((item, i) => {
        let obj = {};
        foundCols.forEach((col, coli) => obj[col] = item[coli]);
        return obj;
    })
    const newId = Math.max(...itemList.map(o => o.id)) + 1;//creating new ID for new record
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
    //puts data in localstorage
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
    //clears the inputs after data save
    const inputs = document.querySelectorAll("input");
    inputs.forEach(inp =>
        inp.value = '')
}

function AddLink() {

    useEffect(() => {
        if (localStorage.getItem("items") != null) return
        localStorage.setItem("items", JSON.stringify(bigData))
        // ULVIS.NET 403 ERROR!
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
        // axios.post("https://ulvis.net/API/write/post/", JSON.stringify({
        //     url: "https://www.youtube.com/watch?v="
        // })).then((res) => { console.log(res, " res from req") }).catch((er) => {
        //     console.log(er)
        // })

    }, [])
    return (
        <div id='add-link-page-holder'>
            <div className='container-fluid p-5 pb-0'>
                <div className='row row-gap-5'>
                    <div className='col-12 col-xl-2'>
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
                                    initialValues={defaultData}
                                    validationSchema={NewRecordSchema}
                                    onSubmit={(value) => { submitHandler(value) }}
                                >
                                    {({ isValid, errors, touched }) => (
                                        <Form>
                                            <FormGroup error={errors.nameSurname} touched={touched.nameSurname} name="nameSurname" placeholder="Enter name and surname" />
                                            <FormGroup error={errors.country} touched={touched.country} name="country" placeholder="Enter a country" />
                                            <FormGroup error={errors.city} touched={touched.city} name="city" placeholder="Enter a city" />
                                            <FormGroup error={errors.email} touched={touched.email} name="email" placeholder="Enter an e-mail (abc@xyz.com)" />
                                            <FormGroup error={errors.website} touched={touched.website} name="website" placeholder="Enter a website (https://xyz.com)" />
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