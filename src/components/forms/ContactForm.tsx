
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  subject?: string;
  message?: string;
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

const ContactForm = () => (
  <div>
    <h1 className="text-cream text-xl md:mb-20 mb-8 text-center">Contact Form</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={ContactSchema}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: write on submit handler
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
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
          
          <button type="submit" className="text-black text-center mt-4 bg-white w-40 h-8 hover:bg-burnt-orange hover:text-cream rounded-md" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ContactForm;