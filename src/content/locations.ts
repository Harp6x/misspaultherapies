import { ALL_CITIES, type CityEntry } from "./city-data";
import type { Location } from "@/types";

export type { Location } from "@/types";

function generateLocation(d: CityEntry): Location {
  if (d.isNRI && d.country) {
    return {
      slug: d.slug,
      city: d.city,
      region: d.country,
      title: `Online Therapy for Indians in ${d.city}, ${d.country}`,
      description: `Online therapy for Indians and NRIs in ${d.city}, ${d.country}`,
      metaDescription: `Indian therapist for NRIs in ${d.city}, ${d.country}. Aishani Paul — RCI-licensed clinical psychologist — offers culturally sensitive online therapy for Indians abroad. Individual, couples, and family therapy.`,
      keywords: [
        `Indian therapist ${d.city}`,
        `NRI therapist ${d.city}`,
        `online therapy Indians ${d.city}`,
        `Indian psychologist ${d.country}`,
        `therapy for NRI ${d.country}`,
        `mental health NRI ${d.country}`,
      ],
      content: `Are you Indian, living in ${d.city}? Finding a therapist who truly understands your cultural background — joint family pressures, diaspora identity, the weight of expectation from back home — can be difficult. Aishani Paul offers culturally attuned online therapy for Indians in ${d.country}, covering anxiety, relationships, identity, homesickness, and more. Sessions are scheduled to fit your time zone. No need to explain your context; she gets it.`,
    };
  }

  return {
    slug: d.slug,
    city: d.city,
    region: d.state,
    title: `Online Therapy in ${d.city}`,
    description: `Online psychotherapy and counselling for ${d.city} residents by Aishani Paul`,
    metaDescription: `Online therapy in ${d.city}, ${d.state} by Aishani Paul — RCI-licensed clinical psychologist. Individual, couples, adolescent, and family therapy via secure video sessions. No commute needed.`,
    keywords: [
      `therapist ${d.city}`,
      `psychologist ${d.city}`,
      `online therapy ${d.city}`,
      `counselling ${d.city}`,
      `mental health ${d.city}`,
      `online counsellor ${d.city}`,
    ],
    content: `Looking for a therapist in ${d.city}? Access professional online therapy from the comfort of your home. Aishani Paul, an RCI-licensed clinical psychologist, offers confidential individual, couples, adolescent, and family therapy via secure video sessions. Whether you're dealing with anxiety, depression, relationship challenges, burnout, or life transitions, high-quality mental health support is now just a video call away — no commute, no waiting rooms, no stigma.`,
  };
}

export const locations: Location[] = [
  {
    slug: "india",
    city: "India",
    title: "Online Therapy in India",
    description: "Professional online therapy accessible across India",
    metaDescription:
      "Online therapy and counselling services across India by Aishani Paul - a licensed clinical psychologist offering individual, couples, and family therapy via secure video sessions.",
    keywords: [
      "online therapy India",
      "psychologist India",
      "counselling India",
      "mental health India",
      "online counselling India",
    ],
    content:
      "Access professional therapy from anywhere in India. Whether you're in a metro city or a smaller town, online therapy removes geographical barriers so you can get the support you need from the comfort of your home. All sessions are conducted via secure video conferencing, and I offer flexible scheduling to accommodate different time zones and work schedules.",
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    region: "West Bengal",
    title: "Online Therapy for Kolkata",
    description: "Online psychotherapy and counselling for Kolkata residents",
    metaDescription:
      "Online therapy and counselling for Kolkata residents by Aishani Paul - licensed clinical psychologist. Individual, couples, and family therapy in English, Hindi, and Bengali.",
    keywords: [
      "therapist Kolkata",
      "psychologist Kolkata",
      "online therapy Kolkata",
      "counselling Kolkata",
      "mental health Kolkata",
      "Bengali therapist",
    ],
    content:
      "Based in Kolkata or anywhere in West Bengal? Access quality therapy without the commute. As a Bengali-speaking therapist, I understand the cultural nuances and can offer sessions in Bengali, Hindi, or English - whichever feels most comfortable for you. From Park Street to Salt Lake, Howrah to New Town, online therapy means you can connect from wherever you are.",
  },
  {
    slug: "west-bengal",
    city: "West Bengal",
    title: "Online Therapy in West Bengal",
    description: "Online psychotherapy accessible across West Bengal",
    metaDescription:
      "Online therapy for West Bengal residents - licensed clinical psychologist offering culturally sensitive counselling in Bengali, Hindi, and English.",
    keywords: [
      "therapist West Bengal",
      "online therapy West Bengal",
      "counselling West Bengal",
      "Bengali psychologist",
    ],
    content:
      "Whether you're in Kolkata, Siliguri, Durgapur, Asansol, or any part of West Bengal, professional therapy is now just a video call away. I offer culturally attuned therapy in Bengali, Hindi, and English - understanding the unique pressures of family, career, and community that shape life in Bengal.",
  },
  {
    slug: "delhi",
    city: "Delhi",
    region: "NCR",
    title: "Online Therapy for Delhi NCR",
    description: "Online psychotherapy and counselling for Delhi NCR",
    metaDescription:
      "Online therapy for Delhi NCR residents by Aishani Paul - licensed clinical psychologist. Convenient, private sessions for anxiety, depression, relationships, and more.",
    keywords: [
      "therapist Delhi",
      "psychologist Delhi",
      "online therapy Delhi",
      "counselling Delhi NCR",
      "mental health Delhi",
    ],
    content:
      "Living in Delhi NCR's fast-paced environment can take a toll on mental health. Skip the traffic and long commutes - access professional therapy from your home or office. I work with individuals, couples, and families across Delhi, Gurgaon, Noida, and the wider NCR region.",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    title: "Online Therapy for Mumbai",
    description: "Online psychotherapy and counselling for Mumbai residents",
    metaDescription:
      "Online therapy for Mumbai residents - licensed clinical psychologist offering confidential sessions for anxiety, depression, couples issues, and more.",
    keywords: [
      "therapist Mumbai",
      "psychologist Mumbai",
      "online therapy Mumbai",
      "counselling Mumbai",
      "mental health Mumbai",
    ],
    content:
      "Mumbai never stops - but you deserve the space to pause and take care of your mental health. Online therapy means you don't have to add another commute to your day. Whether you're in South Mumbai, the suburbs, or Navi Mumbai, connect with a licensed therapist from wherever you are.",
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    region: "Karnataka",
    title: "Online Therapy for Bangalore",
    description: "Online psychotherapy and counselling for Bangalore residents",
    metaDescription:
      "Online therapy for Bangalore residents by Aishani Paul - licensed clinical psychologist. Professional support for tech professionals, students, couples, and families.",
    keywords: [
      "therapist Bangalore",
      "psychologist Bangalore",
      "online therapy Bangalore",
      "counselling Bangalore",
      "mental health Bangalore",
    ],
    content:
      "Bangalore's thriving tech scene comes with its own set of pressures - burnout, imposter syndrome, relocation stress, and work-life imbalance. Online therapy offers a convenient, private way to address these challenges. I work with tech professionals, students, couples, and families across Bangalore.",
  },
  {
    slug: "chennai",
    city: "Chennai",
    region: "Tamil Nadu",
    title: "Online Therapy for Chennai",
    description: "Online psychotherapy and counselling for Chennai residents",
    metaDescription:
      "Online therapy for Chennai residents by Aishani Paul - RCI-licensed clinical psychologist. Confidential individual, couples, and family therapy for anxiety, depression, relationships, and life transitions.",
    keywords: [
      "therapist Chennai",
      "psychologist Chennai",
      "online therapy Chennai",
      "counselling Chennai",
      "mental health Chennai",
    ],
    content:
      "Chennai's blend of tradition and modernity creates unique pressures - career demands, family expectations, and the fast pace of urban life. Online therapy gives you a private, convenient space to process it all. Whether you're in T. Nagar, Anna Nagar, OMR, or anywhere in Chennai, professional support is just a video call away.",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "Telangana",
    title: "Online Therapy for Hyderabad",
    description: "Online psychotherapy and counselling for Hyderabad residents",
    metaDescription:
      "Online therapy for Hyderabad residents - licensed clinical psychologist offering evidence-based therapy for anxiety, depression, couples issues, burnout, and more.",
    keywords: [
      "therapist Hyderabad",
      "psychologist Hyderabad",
      "online therapy Hyderabad",
      "counselling Hyderabad",
      "mental health Hyderabad",
    ],
    content:
      "Hyderabad's growing IT corridor and dynamic culture bring opportunity - and stress. Whether you're dealing with work pressure, relationship challenges, or personal growth, online therapy offers flexible, private support. I work with individuals, couples, and families across Hyderabad and Secunderabad.",
  },
  {
    slug: "pune",
    city: "Pune",
    region: "Maharashtra",
    title: "Online Therapy for Pune",
    description: "Online psychotherapy and counselling for Pune residents",
    metaDescription:
      "Online therapy for Pune residents by Aishani Paul - RCI-licensed clinical psychologist. Support for students, professionals, couples, and families dealing with anxiety, depression, and life transitions.",
    keywords: [
      "therapist Pune",
      "psychologist Pune",
      "online therapy Pune",
      "counselling Pune",
      "mental health Pune",
    ],
    content:
      "Pune's vibrant student community and growing professional scene come with unique mental health needs - academic pressure, career transitions, homesickness, and relationship challenges. Online therapy means you can access support from your hostel, apartment, or office. I work with students, young professionals, couples, and families across Pune.",
  },
  {
    slug: "nri-abroad",
    city: "NRIs Abroad",
    title: "Online Therapy for Indians Abroad (NRI)",
    description: "Online therapy for NRIs and Indians living abroad",
    metaDescription:
      "Online therapy for NRIs and Indians abroad - an Indian therapist who understands your culture. Individual, couples, and family therapy across US, UK, Canada, Australia, UAE, and Singapore.",
    keywords: [
      "NRI therapist",
      "Indian therapist abroad",
      "online therapy NRI",
      "therapist for Indians abroad",
      "Indian psychologist online",
      "therapy for Indians in US",
      "therapy for Indians in UK",
    ],
    content:
      "Living abroad as an Indian comes with its own mental health challenges - cultural identity, homesickness, racism, relationship strain across time zones, and the pressure of 'making it'. You deserve a therapist who understands your context without you having to explain it. I work with NRIs across the US, UK, Canada, Australia, UAE, Singapore, and beyond. Sessions are scheduled to accommodate your time zone.",
  },
];

// Slugs already covered by hand-crafted entries above
const FEATURED_SLUGS = new Set(
  locations.map((l) => l.slug)
);

// Append auto-generated entries for all remaining cities
const generated = ALL_CITIES.filter(
  (c) => !FEATURED_SLUGS.has(c.slug)
).map(generateLocation);

locations.push(...generated);
