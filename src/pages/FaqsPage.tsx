import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contact");
  };

  const questions: FAQItem[] = [
    {
      question: "How does the billing work?",
      answer:
        "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
    },
    {
      question: "Can I get a refund for my subscription?",
      answer:
        "We offer a 30-day money-back guarantee for most of its subscription plans. If you are not satisfied with your subscription within the first 30 days, you can request a full refund. Refunds for subscriptions that have been active for longer than 30 days may be considered on a case-by-case basis.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, you can log in to your account and navigate to the subscription management page. From there, you should be able to cancel your subscription and stop future billing.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "We offer a free trial of our software for a limited time. During the trial period, you will have access to a limited set of features and functionality, but you will not be charged.",
    },
    {
      question: "How do I contact support?",
      answer:
        "If you need help with our platform or have any other questions, you can contact the company's support team by submitting a support request through the website or by emailing support@ourwebsite.com.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "We may offer discounts or promotions from time to time. To stay up-to-date on the latest deals and special offers, you can sign up for the company's newsletter or follow it on social media.",
    },
  ];

  const filteredQuestions = questions.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-4 top-4 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-2xl shadow-lg divide-y divide-gray-200/50">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : (
            filteredQuestions.map((item, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>
          <button
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
            onClick={handleClick}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
