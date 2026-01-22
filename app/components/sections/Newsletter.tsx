"use client";

import { useState } from "react";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Mailchimp form submission
    try {
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("FNAME", firstName);
      formData.append("LNAME", lastName);
      formData.append("tags", "10539032");

      // This would be replaced with actual Mailchimp API call
      await fetch("https://seekpanacea.us12.list-manage.com/subscribe/post", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setMessage("Thank you for subscribing!");
      setEmail("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-dark-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Logo and Divider */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-8">
              <Image
                src="https://seekpanacea.com/wp-content/uploads/2023/03/panacea-main-150x150.jpg"
                alt="Panacea Logo"
                width={150}
                height={150}
                className="rounded-full shadow-2xl"
              />
            </div>

            <div className="w-full max-w-xs">
              <div className="border-t-2 border-accent-teal"></div>
            </div>
          </div>

          {/* Right Column - Newsletter Form */}
          <div className="bg-accent-gold/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-accent-gold/20">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Be the first to know
                </h2>
                <p className="text-xl text-white/90">
                  Get updates on genomic discoveries and life-saving testing
                  <br />
                  and get{" "}
                  <span className="font-bold text-accent-teal">
                    10% OFF
                  </span>{" "}
                  your test!
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sign up below!
                </h3>
                <p className="text-white/80">
                  We respect your privacy. We do not share your information with
                  anyone outside of Panacea.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="mce-EMAIL"
                      className="block text-white font-semibold mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="mce-EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="mce-FNAME"
                        className="block text-white font-semibold mb-2"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="mce-FNAME"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent"
                        placeholder="First Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mce-LNAME"
                        className="block text-white font-semibold mb-2"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="mce-LNAME"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-teal text-black font-bold py-4 px-6 rounded-lg hover:bg-teal-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </button>

                  {message && (
                    <p
                      className={`mt-4 text-center ${message.includes("Thank you") ? "text-green-400" : "text-red-400"}`}
                    >
                      {message}
                    </p>
                  )}
                </div>

                <div className="text-center text-white/70 text-sm">
                  <span className="text-red-500">*</span> indicates required
                </div>
              </form>

              {/* Social Media Links */}
              <div className="pt-8 border-t border-white/20">
                <div className="text-center">
                  <p className="text-white mb-6">Follow us on social media</p>
                  <SocialIcons />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only footer menu */}
        <div className="lg:hidden mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center space-y-8">
              <SocialIcons />

              <div className="text-white">
                <p className="font-bold text-lg mb-4">Quick Links</p>
                <div className="space-y-2">
                  <a
                    href="/faq"
                    className="block hover:text-accent-teal transition-colors"
                  >
                    FAQ
                  </a>
                  <a
                    href="/contact-us"
                    className="block hover:text-accent-teal transition-colors"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/privacy"
                    className="block hover:text-accent-teal transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms"
                    className="block hover:text-accent-teal transition-colors"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
