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
    const {first_name, last_name, email, subject, message} = values;
    setSubmitting(true);

    console.log('email ->', email)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, subject, text:message }),
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
              {submitting ? 
                <div className="flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-burnt-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                      <span className="sr-only">Loading...</span>
                  </div>
                </div>
                :
                'Submit'
              }
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default ContactForm;