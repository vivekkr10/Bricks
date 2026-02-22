import React from "react";
import { motion } from "framer-motion";

export default function Inquiry() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#FCFAF8] flex items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl bg-[#2a1a13]/80 backdrop-blur-xl border border-white/10 text-white rounded-3xl shadow-2xl overflow-hidden md:grid md:grid-cols-2"
      >

        {/* ================= LEFT SIDE IMAGE ================= */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden md:block h-[850px]"
        >
          <img
            src="https://i.pinimg.com/736x/6d/d7/59/6dd759707ab5ad1247c1923133beefae.jpg"
            alt="Construction"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1a13]/30 to-[#2a1a13]/45"></div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-10 left-10 right-10"
          >
            <h3 className="text-2xl font-bold mb-4">
              Let’s Build Something Strong Together
            </h3>
            <p className="text-gray-300 text-sm">
              Our team will respond within 24 hours with expert guidance tailored to your construction needs.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT SIDE FORM ================= */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="p-10 md:p-14 self-start"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center md:text-left text-orange-500">
            Inquiry Form
          </h2>

          <form className="space-y-6">

            {[
              { label: "Full Name", type: "text", placeholder: "Enter your name" },
              { label: "Email Address", type: "email", placeholder: "Enter your email" },
              { label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <label className="block mb-2 font-medium text-orange-200">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-4 rounded-xl bg-[#1f140f]/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-white placeholder-white/70"
                />
              </motion.div>
            ))}

            {/* Message */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block mb-2 font-medium text-orange-200">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your inquiry..."
                className="w-full px-4 py-4 rounded-xl bg-[#1f140f]/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none text-white placeholder-white/70"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/40"
            >
              Submit Inquiry
            </motion.button>

          </form>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
