const FaqSection = () => {
  return (
    <div>
      <section className=" ">
        <div className="container px-6 py-12 mx-auto">
          <h1 className="text-2xl text-center font-semibold text-gray-500 lg:text-3xl dark:text-white">
            Frequently asked questions.
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  What is for HomeFinder?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  HomeFinder is a comprehensive real estate platform that
                  connects buyers, sellers, and real estate agents. It offers a
                  wide range of properties, detailed property information, and
                  tools to help you find your dream home or sell your property
                  efficiently.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  How do I create an account on HomeFinder?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  To create an account, click on the "Sign Up" button on the
                  homepage and fill in your details. You can also sign up using
                  your social media accounts for convenience.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Is HomeFinder free to use?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Yes, creating an account and browsing properties on [Website
                  Name] is free. However, agents and sellers may incur fees for
                  listing properties and using premium features.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-block p-3 text-white bg-blue-600 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  How do I contact the agent for a property I'm interested in?
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Each property listing includes the agent's contact
                  information. You can reach out to the agent directly via email
                  or phone to inquire further about the property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
