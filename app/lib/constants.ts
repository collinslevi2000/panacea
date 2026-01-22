export const SITE_URLS = {
  home: "https://seekpanacea.com/",
  contact: "https://seekpanacea.com/contact-us/",
  faq: "https://seekpanacea.com/faq/",
  geneticCounseling: "https://seekpanacea.com/genetic-counseling/",
  science: "https://seekpanacea.com/fascinating-science/",
  diseaseRisks: "https://seekpanacea.com/disease-risks/",
  whoWeAre: "https://seekpanacea.com/who-we-are/",
  mediaPress: "https://seekpanacea.com/media-press/",
  realStories: "https://seekpanacea.com/real-stories/",
};

export const NAV_ITEMS = [
  {
    id: "learn-more",
    title: "Learn More",
    children: [
      { id: "faq", title: "Frequently Asked Questions", href: SITE_URLS.faq },
      {
        id: "genetic-counseling",
        title: "Genetic Counseling",
        href: SITE_URLS.geneticCounseling,
      },
      { id: "science", title: "Science", href: SITE_URLS.science },
      {
        id: "disease-risks",
        title: "Report and Results",
        href: SITE_URLS.diseaseRisks,
      },
      { id: "who-we-are", title: "Who We Are", href: SITE_URLS.whoWeAre },
      { id: "media-press", title: "Media & Press", href: SITE_URLS.mediaPress },
      {
        id: "real-stories",
        title: "Real Stories",
        href: SITE_URLS.realStories,
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    href: SITE_URLS.contact,
  },
];

export const EXTERNAL_STYLES = [
  "https://seekpanacea.com/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=6.1.4",
  "https://seekpanacea.com/wp-content/plugins/woocommerce/assets/css/woocommerce.css?ver=10.4.3",
  "https://seekpanacea.com/wp-content/plugins/elementor/assets/css/frontend.min.css?ver=3.34.1",
];

export const EXTERNAL_SCRIPTS = {
  googleTagManager: "GTM-WKL4RKJ3",
  facebookPixel: "699294801583392",
};
