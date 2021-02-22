import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import verificador  from 'verificador-rut'
 
 const SignupSchema = Yup.object().shape({
   firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });

 if(true){
   console.log(verificador("18888102-5"));
   console.log(verificador("18.888.102-5"));
 }
 var rut = "18888102-5"
var rutsplit = rut.split("-");
var rutcont = rutsplit[0].concat(rutsplit[1])
 
console.log(typeof rutcont)


 export const ValidationSchemaExample = () => (
   <div>
     <h1>Signup</h1>
     <Formik
       initialValues={{
         firstName: '',
         lastName: '',
         email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field name="firstName" />
           {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}
           <Field name="lastName" />
           {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
           ) : null}
           <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
 );

 export default ValidationSchemaExample;