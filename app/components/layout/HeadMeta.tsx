import type { Metadata } from "next";

export default function HeadMeta() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <link rel="profile" href="http://gmpg.org/xfn/11" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WKL4RKJ3');`,
        }}
      />
      {/* End Google Tag Manager */}

      {/* Yoast SEO */}
      <meta
        name="description"
        content="DISEASE PREVENTION STARTS WITH YOU. Discover your disease risks. Make preventative healthcare a reality."
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Home - Panacea" />
      <meta
        property="og:description"
        content="DISEASE PREVENTION STARTS WITH YOU. Discover your disease risks. Make preventative healthcare a reality."
      />
      <meta property="og:url" content="https://seekpanacea.com/" />
      <meta property="og:site_name" content="Panacea" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/panaceagenomics"
      />
      <meta
        property="article:modified_time"
        content="2025-05-08T09:39:12+00:00"
      />
      <meta
        property="og:image"
        content="https://seekpanacea.com/wp-content/uploads/2023/03/panacea-main.jpg"
      />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="1500" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Home - Panacea" />
      <meta
        name="twitter:description"
        content="DISEASE PREVENTION STARTS WITH YOU. Discover your disease risks. Make preventative healthcare a reality."
      />
      <meta
        name="twitter:image"
        content="https://seekpanacea.com/wp-content/uploads/2023/03/panacea-main.jpg"
      />

      {/* Favicons */}
      <link
        rel="icon"
        href="https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea-won-black-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        href="https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea-won-black-192x192.png"
        sizes="192x192"
      />
      <link
        rel="apple-touch-icon"
        href="https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea-won-black-180x180.png"
      />
      <meta
        name="msapplication-TileImage"
        content="https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea-won-black-270x270.png"
      />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* RSS Feeds */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Panacea » Feed"
        href="https://seekpanacea.com/feed/"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Panacea » Comments Feed"
        href="https://seekpanacea.com/comments/feed/"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Panacea",
            url: "https://seekpanacea.com/",
            description:
              "Disease prevention through genetic testing and personalized healthcare",
            publisher: {
              "@type": "Organization",
              name: "Panacea",
              logo: {
                "@type": "ImageObject",
                url: "https://seekpanacea.com/wp-content/uploads/2023/03/panacea-main.jpg",
              },
            },
          }),
        }}
      />

      {/* Generator */}
      <meta name="generator" content="Next.js 14" />
    </>
  );
}
