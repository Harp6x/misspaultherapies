import { groq } from "next-sanity";

// ── Site Config (singleton) ──
export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0]{
    name, tagline, description, author, handle,
    email, phone, whatsappNumber, whatsappMessage,
    rciNumber, qualifications, languages,
    instagram, youtube, linkedin,
    googleFormUrl, upiId,
    feeIndividual, feeCouples, feeFamily, feeAssessment, feePackage,
    slidingScale, sessionDuration, cancellationPolicy
  }
`;

// ── About Page (singleton) ──
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    title,
    photo,
    bioParagraph1, bioParagraph2, bioParagraph3,
    credentials[]{ icon, label },
    approachIntro,
    values[]{ icon, title, description },
    languagesText, connectHeading, connectText,
    socialLinks[]{ platform, url, icon }
  }
`;

// ── Services ──
export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc){
    title,
    "slug": slug.current,
    shortTitle, description, icon,
    highlights, idealFor, approach, fee, order
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    shortTitle, description, icon,
    highlights, idealFor, approach, fee
  }
`;

// ── Blog Posts ──
export const allBlogPostsQuery = groq`
  *[_type == "blogPost" && published == true] | order(publishedAt desc){
    title,
    "slug": slug.current,
    description, category,
    "datePublished": publishedAt,
    readingTime, published, body
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description, category,
    "datePublished": publishedAt,
    readingTime, published, body
  }
`;

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost" && published == true]{ "slug": slug.current }
`;

// ── FAQs ──
export const allFaqsQuery = groq`
  *[_type == "faq"] | order(category asc, order asc){
    question, answer, category, order
  }
`;

// ── Resources ──
export const allResourcesQuery = groq`
  *[_type == "resource"] | order(order asc){
    title, tag, icon, content, order
  }
`;

// ── Testimonials ──
export const approvedTestimonialsQuery = groq`
  *[_type == "testimonial" && approved == true] | order(order asc){
    quote, name, context, order
  }
`;

// ── Locations ──
export const allLocationsQuery = groq`
  *[_type == "location"] | order(name asc){
    name,
    "slug": slug.current,
    title, description, metaDescription,
    features, services
  }
`;

export const locationBySlugQuery = groq`
  *[_type == "location" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    title, description, metaDescription,
    features, services
  }
`;

export const allLocationSlugsQuery = groq`
  *[_type == "location"]{ "slug": slug.current }
`;

// ── Gallery ──
export const allGalleryItemsQuery = groq`
  *[_type == "galleryItem"] | order(order asc){
    _id, title, type, url, description, featured, order,
    image{ asset->{ _id, url }, alt }
  }
`;

export const featuredGalleryItemsQuery = groq`
  *[_type == "galleryItem" && featured == true] | order(order asc){
    _id, title, type, url, description,
    image{ asset->{ _id, url }, alt }
  }
`;

// ── Workshops ──
export const allWorkshopsQuery = groq`
  *[_type == "workshop" && published == true] | order(order asc){
    title, "slug": slug.current,
    description, date, duration, fee,
    registrationUrl, status, order,
    coverImage{ asset->{ _id, url }, alt }
  }
`;

export const workshopBySlugQuery = groq`
  *[_type == "workshop" && slug.current == $slug][0]{
    title, "slug": slug.current,
    description, body, date, duration, fee,
    registrationUrl, status,
    coverImage{ asset->{ _id, url }, alt }
  }
`;
