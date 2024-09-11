import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ContactToast from '@components/ContactToast';
interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string
}

const ContactSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First Name Too Short')
    .max(20, 'First NameToo Long')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Last Name Too Short')
    .max(20, 'Last Name Too Long')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  subject: Yup.string()
    .min(2, 'Subject Too Short')
    .required('Required'),
  message: Yup.string()
    .min(2, 'Message Too Short')
    .required('Required')
});

const ContactForm = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitFailed, setSubmitFailed] = useState<boolean>(false);
  
  const handleSubmit = async (values: FormValues) => {
    const {first_name, last_name, subject, message} = values;
    setSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, subject, text:message }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    }
    catch (error) {
      console.error('Error:', error);
      setSubmitFailed(true);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <ContactToast 
        setSubmitSuccess={setSubmitSuccess}
        setSubmitFailed={setSubmitFailed}
        submitFailed={submitFailed}
        submitSuccess={submitSuccess}
      />

      <h1 className="text-cream text-xl md:mb-20 mb-8 text-center">Contact Form</h1>
      <Formik
        initialValues={{ first_name: '', last_name: '', email: '', subject: '', message: '' }}
        validationSchema={ContactSchema}
        onSubmit={async (values,  { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="flex flex-col items-center m-auto md:w-[32rem]">
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex md:justify-normal space-x-2">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="first_name" className="text-cream">First Name</label>
                  <Field type="first_name" name="first_name" label="First Name" className="text-black rounded-md w-4/5   h-8 md:w-full px-2 focus:outline-burnt-orange" />
                  <ErrorMessage name="first_name" component="div" className="text-burnt-red" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="last_name" className="text-cream">Last Name</label>
                  <Field type="last_name" name="last_name" label="Last Name" className="text-black rounded-md w-4/5  h-8 md:w-full px-2 focus:outline-burnt-orange" />
                  <ErrorMessage name="last_name" component="div" className="text-burnt-red" />
                </div>
              </div>

              <label htmlFor="email" className="text-cream">Email</label>
              <Field type="email" name="email" className="text-black rounded-md h-8 px-2 focus:outline-none focus:ring-burnt-orange focus:border-burnt-orange" />
              <ErrorMessage name="email" component="div" className="text-burnt-red" />

              <label htmlFor="subject" className="text-cream">Subject</label>
              <Field type="subject" name="subject" className="text-black rounded-md h-8 px-2 focus:outline-burnt-orange" />
              <ErrorMessage name="subject" component="div" className="text-burnt-red" />

              <label htmlFor="message" className="text-cream">Message</label>
              <Field type="message" name="message" component="textarea" rows="4" className="text-black rounded-md px-2 focus:outline-none focus:ring-burnt-orange focus:border-burnt-orange" />
              <ErrorMessage name="message" component="div" className="text-burnt-red" />
            </div>
            
            <button type="submit" className={`text-black text-center mt-4 bg-white w-40 h-8 rounded-md ${submitting ? 'bg-gray-400' : 'hover:bg-burnt-orange hover:text-cream'}`} disabled={submitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default ContactForm;