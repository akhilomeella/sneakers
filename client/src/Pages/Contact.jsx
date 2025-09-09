import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Got a question, feedback, or need help with your order? We’re here to
        help!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              className="w-full border border-gray-300 px-4 py-2 h-32 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-white p-6 shadow-lg rounded-lg space-y-4 text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Our Store</h2>
          <p>
            <strong>Address:</strong>
            <br />
            123 Sneaker Street
            <br />
            Lagos, Nigeria
          </p>
          <p>
            <strong>Email:</strong>
            <br />
            support@sneakers.com
          </p>
          <p>
            <strong>Phone:</strong>
            <br />
            +234 800 000 0000
          </p>
          <p>
            <strong>Hours:</strong>
            <br />
            Monday – Friday: 9am – 6pm
            <br />
            Saturday: 10am – 4pm
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
