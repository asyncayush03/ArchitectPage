import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-32 px-6 bg-white text-gray-800">
      
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to connect — here’s how you can reach us.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-10 w-full max-w-4xl justify-center">
        <div className="p-6 bg-gray-50 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Project Inquiries</h2>
          <p className="text-gray-700">
            <a href="mailto:abc@gmail.com" className="hover:text-indigo-500">
              abc@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            <a href="tel:1234567890" className="hover:text-indigo-500">
              +91 12345 67890
            </a>
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">PR & Collaborations</h2>
          <p className="text-gray-700">Vendor Manager</p>
          <p className="text-gray-700">
            <a href="mailto:abc@gmail.com" className="hover:text-pink-500">
              abc@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            <a href="tel:1234567890" className="hover:text-pink-500">
              +91 12345 67890
            </a>
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">
          Find Us Here
        </h2>
        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
          <iframe
            title="Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.901253327179!2d-73.9796811845949!3d40.764356079326774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f4b3cb8e4b%3A0x705bf1b6e1a4a4a9!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1682961928769!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center pb-10">
        <h3 className="text-lg font-semibold text-indigo-600">WeTransfer</h3>
        <p className="text-gray-600 mt-2">
          Building beautiful user experiences, one project at a time.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
