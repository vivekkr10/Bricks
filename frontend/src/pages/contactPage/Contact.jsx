import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Youtube } from "lucide-react";
import { ArrowRight, MapPinHouse, PhoneCall, Mail  } from 'lucide-react';
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 },
      });

      // Reveal overlay
      tl.to(".reveal-overlay", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
      });

      // Left block
      tl.from(
        ".left-block",
        {
          x: -150,
          opacity: 0,
          duration: 1.6,
          ease: "power3.out",
        },
        "-=1",
      );

      // Heading animation
      tl.from(
        ".text-line",
        {
          yPercent: 120,
          stagger: 0.15,
        },
        "-=0.8",
      );

      // Form fields
      tl.from(
        ".form-field",
        {
          y: 40,
          opacity: 0,
          stagger: 0.15,
        },
        "-=0.8",
      );

      // Checkbox + button animation
      tl.from(
        ".form-bottom",
        {
          y: 40,
          opacity: 0,
          duration: 1,
        },
        "-=0.6",
      );

      // FAQ Scroll Animation (one by one)
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
        },
        y: -80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0); // first open

  return (
    <>
      {/* CONTACT BANNER */}
      <section className="h-[60vh] bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
         <img
          src="https://www.shutterstock.com/image-vector/contact-us-customer-support-hotline-600nw-2407847227.jpg"
          alt="Contact banner"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-6">Contact <span className="text-[#F54900]">Us</span></h1>
        </div>
      </section>

      <section
        ref={container}
        className="relative min-h-screen bg-gray-100 text-black flex items-center justify-center"
      >
        {/* Reveal */}
        <div className="reveal-overlay absolute inset-0 bg-white origin-top z-50"></div>

        <div className="p-16 grid md:grid-cols-2 gap-20 items-center">
          {/* LEFT SIDE (VERTICALLY CENTERED) */}
          <div className="left-block flex flex-col justify-center space-y-7 text-sm tracking-wide h-full">
            <div>
              <p className="text-black font-bold mb-4 text-xl">SOCIAL NETWORK</p>

              {/* Social icons */}
              <div className="flex space-x-4 mb-5">
                {/* Facebook */}
                <Link
                  to="https://www.facebook.com/TheBrickStoreIndia/"
                  className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center hover:bg-[#155DFC] transition hover:border-[#155DFC] group"
                  target="blank"
                >
                  <Facebook className="group-hover:text-white"/>
                </Link>

                {/* Instagram */}
                <Link
                  to="https://www.instagram.com/thebrickstore_india/"
                  className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center hover:bg-[#D1226E] transition hover:border-[#D1226E] group"
                  target="blank"
                >
                  <Instagram className="group-hover:text-white"/>
                </Link>

                {/* LinkedIn */}
                <Link
                  to="https://www.linkedin.com/company/thebrickstoreindia"
                  className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center hover:bg-[#146CC6] transition hover:border-[#146CC6] group"
                  target="blank"
                >
                  <Linkedin className="group-hover:text-white"/>
                </Link>

                {/* Youtube */}
                <Link
                  to="/contact"
                  className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center hover:bg-[#FF0335] transition hover:border-[#FF0335] group"
                  target="blank"
                >
                  <Youtube className="group-hover:text-white"/>
                </Link>
              </div>
            </div>

            {/* Information */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* <div>
                <p className="text-gray-500">TIMINGS</p>
                <p>Brick Sales : +91 75709 75709</p>
                <p>9:30 AM to 6:30 PM (Monday to Saturday)</p>
              </div> */}

              <div className="text-slate-600 text-md leading-relaxed">
                <p className="text-black font-bold text-xl flex items-center gap-2">
                  <MapPinHouse size={25} className="text-[#F54900]"/>
                  ADDRESS
                </p>
                <p>7XF5+3WX, Kamrej Char Rasta,</p>
                <p>Kamrej, Gujarat 394185</p>
              </div>

              <div className="text-slate-600 text-md leading-relaxed">
                <p className="text-black font-bold text-xl flex items-center gap-2">
                  <PhoneCall size={25} className="text-[#F54900]"/>
                  PHONE
                </p>
                <Link to="tel:+91 98254 74047">+91 98254 74047,</Link> <br />
                <Link to="tel:+91 98252 66811">+91 98252 66811,</Link> <br />
                <Link to="tel:+91 95860 24642">+91 95860 24642,</Link>
              </div>

              <div className="text-slate-600 text-md leading-relaxed">
                <p className="text-black font-bold text-xl flex items-center gap-2">
                  <Mail size={25} className="text-[#F54900]"/>
                  EMAIL
                </p>
                <Link to="mailto:support@vrandsons.com">support@vrandsons.com</Link>
              </div>
            </div>

            {/* MAP */}
            <div className="border border-[#2A2A2A]">
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14716.279175468773!2d73.624957!3d22.762791000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39609a493a23be67%3A0xd09873eac12a2fc4!2sJay%20Jalaram%20Brick%20Works%20-%20The%20Brick%20Store!5e0!3m2!1sen!2sin!4v1771137096490!5m2!1sen!2sin"
                width="100%"
                height="200"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center">
            {/* Compact Heading */}
            <div className="leading-[0.9] text-[60px] md:text-[72px] font-semibold tracking-tight">
              <div className="overflow-hidden">
                <h1 className="text-line">LET’S GET IN</h1>
              </div>

              <div className="overflow-hidden -mt-2">
                <h1 className="text-line">TOUCH</h1>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-8 pt-12">
              <input
                type="text"
                placeholder="FULL NAME"
                className="form-field w-full bg-transparent border-b border-gray-700 pb-3 focus:outline-none focus:border-[#F54900]"
                required
              />

              <input
                type="text"
                placeholder="PHONE"
                className="form-field w-full bg-transparent border-b border-gray-700 pb-3 focus:outline-none focus:border-[#F54900]"
                required
              />

              <input
                type="email"
                placeholder="EMAIL"
                className="form-field w-full bg-transparent border-b border-gray-700 pb-3 focus:outline-none focus:border-[#F54900]"
                required
              />

              <textarea
                rows="3"
                placeholder="MESSAGE"
                className="form-field w-full bg-transparent border-b border-gray-700 pb-3 focus:outline-none focus:border-[#F54900]"
                required
              />

              <div className="form-bottom flex flex-col lg:flex-row justify-between items-center pt-1 text-sm gap-5">
                <label className="flex items-center gap-2">
                  <input type="checkbox" required />I AGREE TO PRIVACY POLICY
                </label>

                <button
                  type="submit"
                  className="border border-gray-600 px-6 py-2 hover:text-white hover:border-[#ec6d13] rounded-xl cursor-pointer flex hover:bg-[#ec6d13] hover:scale-105 transition duration-300 ease-in-out"
                >
                  <ArrowRight className="mr-2" size={20}/> SUBMIT MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section bg-black text-white py-20 px-10">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "What does term facing bricks , exposed bricks, elevation bricks mean?",
              a: "Facing bricks , exposed bricks or elevation bricks have the same meaning, here bricks are just not meant for structural purpose but also serve the role in elevation and in the looks of the building.",
            },
            {
              q: "What is the role of JJB.",
              a: "Role of JJB is to Manufacture & supply Bricks.",
            },
            {
              q: "Where can i buy",
              a: "Brick being a bulky product we normally supply to end customers directly without any dealers or distributors which also benefits the end user as there are no middleman margins.",
            },
            {
              q: "How should I select a right brick for my project",
              a: "There are different categories of bricks meant for various applications, this is an important question as the best way is you can share your complete information with our sales team and we assure you our team will guide you with a correct product for your application.",
            },
            {
              q: "What is facing bricks & benefit of using a facing bricks",
              a: "Face brick is the term used for brick meant not only for structural purpose but also serve the role in elevation and in the looks of the building or a landscape too. Facing bricks , exposed bricks or elevation bricks have the same meaning. Facing bricks offers a look, energy efficiency and value to the structure.",
            },
            {
              q: "What is the price of the bricks",
              a: "Rate of the bricks varies from product to product and location of the project, the best way to get rates from us is to share your project details, i). type of bricks, ii) Quantity, iii). project location.",
            },
            {
              q: "Where does JJB manufactures these bricks.",
              a: "JJB manufacture bricks in production facility at Godhra, Gujarat.",
            },
            {
              q: "What is the transportation Costs & who's responsibilityis transportation.",
              a: "We always offer price with transportation costs, normally transportation is in our scope subject to MOQ.",
            },
            {
              q: "How much time does it take to deliver the bricks",
              a: "It depends on the type of product that you chooses, sometimes due to excess demand for some products there is waiting time for couple of weeks too, so here we request to speak to our team directly for availability of a particular product.",
            },
            {
              q: "How these bricks are laid and where can i find the mason or team for doing the brick work",
              a: "These bricks are laid by special trained masons who have knowledge of facing bricks masonry, normally we suggest few agencies to our customer for the same, however our scope of work is strictly up to supplying bricks.",
            },
            {
              q: "How can I estimate the quantity of bricks I shall require.",
              a: "The quantity of bricks is subject to type of bricks selected, the drawing of engineer or an architect. This information should come from your engineer or the architect.",
            },
            {
              q: "Can I return the excess bricks.",
              a: "We do not accept any returns.",
            },
            {
              q: "Where can i see the bricks for selection",
              a: "On our website, our brochure, or you can order a paid sample, however we believe 1 sample bricks is never conclusive so here we invite customers to visit our factory @ Godhra to feel & touch the bricks before making any selection or buying.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="faq-item border-b border-[#2A2A2A] pb-4"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full text-left text-lg font-medium flex justify-between items-center overflow-hidden"
              >
                <span className="faq-question block">{item.q}</span>

                <span>{activeIndex === index ? "−" : "+"}</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "max-h-40 mt-3 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-400">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
