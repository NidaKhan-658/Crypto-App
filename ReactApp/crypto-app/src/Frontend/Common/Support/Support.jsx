import React from "react";
import "./Support.css";
import { useForm, ValidationError } from "@formspree/react";

const Support = () => {
  const [state, handleSubmit] = useForm("mnnqqdez");

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero"></section>

      {/* Contact Form Section */}
      <section className="contact-form">
        <h2 className="glow">Get in Touch</h2>
        {state.succeeded ? (
          <p className="success-message">
            Thank you! Your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" required className="input-glow" />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                required
                className="input-glow"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                required
                className="input-glow"
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </label>

            <button
              type="submit"
              className="submit-button"
              disabled={state.submitting}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Our Location</h2>
        <p>Come visit us at our office or reach us through the form above.</p>
        <div className="map-placeholder">
          {/* Placeholder for the map */}
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.9430345085!2d-118.69192573479191!3d34.02016129906562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bb36dbdf4af1%3A0x5c1f98a98f0d7d8!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1635368975294!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Support;
