import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ContactSection() {
  return (
    
    <div className="bg-[#FCFAF8] text-[#2a1a13]">

      {/* ================= HERO / GET IN TOUCH ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="relative rounded-2xl overflow-hidden shadow-xl">

            {/* Background Image */}
            <img
              src="https://i.pinimg.com/736x/1a/0a/b4/1a0ab4e00a136fbdbf475d4bc3f0b7aa.jpg"
              alt="Office"
              className="w-full h-[420px] object-cover"
            />

            {/* Orange Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a1a13]/50 via-[#2a1a13]/80 to-[#d97706]/50"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in Touch
              </h1>

              <p className="max-w-2xl text-gray-200 mb-8">
                Our team is here to help with your technical or sales inquiries.
                Reach out to us today and experience our dedicated support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/inquiry">
  <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-lg font-semibold shadow-lg">
    Contact Inquiry
  </button>
</Link>


                <button className="border border-white hover:bg-white hover:text-[#2a1a13] transition px-8 py-3 rounded-lg font-semibold">
                  View Locations
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      
{/* ================= CONTACT INFO CARDS ================= */}
<section className="py-16 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

    {/* Address */}
    <div className="bg-[#2a1a13]/85 backdrop-blur-lg border border-white/10 text-white p-8 rounded-xl shadow-2xl hover:scale-105 hover:border-orange-500/40 transition-all duration-300">
      <div className="text-orange-500 mb-4">
        <MapPin size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-3">Office Address</h3>
      <p className="text-gray-300">
        123 Business Way, Suite 400 <br />
        Tech City, CA 94000
      </p>
    </div>

    {/* Phone */}
    <div className="bg-[#2a1a13]/85 backdrop-blur-lg border border-white/10 text-white p-8 rounded-xl shadow-2xl hover:scale-105 hover:border-orange-500/40 transition-all duration-300">
      <div className="text-orange-500 mb-4">
        <Phone size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-3">Phone Number</h3>
      <p className="text-gray-300">
        +1 800-555-0199 <br />
        Mon – Fri, 9AM – 6PM
      </p>
    </div>

    {/* Email */}
    <div className="bg-[#2a1a13]/85 backdrop-blur-lg border border-white/10 text-white p-8 rounded-xl shadow-2xl hover:scale-105 hover:border-orange-500/40 transition-all duration-300">
      <div className="text-orange-500 mb-4">
        <Mail size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-3">Email Support</h3>
      <p className="text-gray-300">
        support@company.com <br />
        Response within 24 hours
      </p>
    </div>

  </div>
</section>



{/* ================= CTA FORM SECTION ================= */}
<section className="py-16 px-6">
  <div className="max-w-4xl mx-auto bg-[#2a1a13]/90 backdrop-blur-lg border border-white/10 text-white rounded-2xl p-12 text-center shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">

    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Have a specific question?
    </h2>

    <p className="text-gray-300 mb-8">
      Fill out our inquiry form and a representative will get back to you within
      24 hours. Our specialists are ready to provide tailored solutions for your needs.
    </p>

    <button className="bg-orange-500 hover:bg-orange-600 transition px-10 py-4 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/40">
      Contact Inquiry
    </button>

  </div>
</section>



      {/* ================= OUR LOCATION SECTION ================= */}
      <section className="py-16 px-6 bg-[#FCFAF8]">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-500">
              Our Location
            </h2>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-medium hover:underline"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=123%20Business%20Way&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale hover:grayscale-0 transition duration-500"
            ></iframe>

          </div>

        </div>
      </section>

    </div>
  );
}
