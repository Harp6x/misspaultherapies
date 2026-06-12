export interface CityEntry {
  slug: string;
  city: string;
  state: string;
  isNRI?: boolean;
  country?: string;
}

// Indian cities — Tier 1/2/3 across all states
// Existing featured slugs (kolkata, west-bengal, delhi, mumbai, bangalore, chennai, hyderabad, pune) are skipped in generator
export const INDIAN_CITIES: CityEntry[] = [
  // Delhi NCR
  { slug: "noida", city: "Noida", state: "Uttar Pradesh" },
  { slug: "gurgaon", city: "Gurgaon", state: "Haryana" },
  { slug: "faridabad", city: "Faridabad", state: "Haryana" },
  { slug: "ghaziabad", city: "Ghaziabad", state: "Uttar Pradesh" },
  { slug: "greater-noida", city: "Greater Noida", state: "Uttar Pradesh" },

  // Rajasthan
  { slug: "jaipur", city: "Jaipur", state: "Rajasthan" },
  { slug: "jodhpur", city: "Jodhpur", state: "Rajasthan" },
  { slug: "udaipur", city: "Udaipur", state: "Rajasthan" },
  { slug: "kota", city: "Kota", state: "Rajasthan" },
  { slug: "ajmer", city: "Ajmer", state: "Rajasthan" },
  { slug: "bikaner", city: "Bikaner", state: "Rajasthan" },
  { slug: "alwar", city: "Alwar", state: "Rajasthan" },
  { slug: "bharatpur", city: "Bharatpur", state: "Rajasthan" },

  // Uttar Pradesh
  { slug: "lucknow", city: "Lucknow", state: "Uttar Pradesh" },
  { slug: "agra", city: "Agra", state: "Uttar Pradesh" },
  { slug: "varanasi", city: "Varanasi", state: "Uttar Pradesh" },
  { slug: "kanpur", city: "Kanpur", state: "Uttar Pradesh" },
  { slug: "prayagraj", city: "Prayagraj", state: "Uttar Pradesh" },
  { slug: "meerut", city: "Meerut", state: "Uttar Pradesh" },
  { slug: "aligarh", city: "Aligarh", state: "Uttar Pradesh" },
  { slug: "moradabad", city: "Moradabad", state: "Uttar Pradesh" },
  { slug: "bareilly", city: "Bareilly", state: "Uttar Pradesh" },
  { slug: "gorakhpur", city: "Gorakhpur", state: "Uttar Pradesh" },
  { slug: "saharanpur", city: "Saharanpur", state: "Uttar Pradesh" },
  { slug: "mathura", city: "Mathura", state: "Uttar Pradesh" },
  { slug: "muzaffarnagar", city: "Muzaffarnagar", state: "Uttar Pradesh" },
  { slug: "vrindavan", city: "Vrindavan", state: "Uttar Pradesh" },

  // Haryana
  { slug: "chandigarh", city: "Chandigarh", state: "Chandigarh" },
  { slug: "ambala", city: "Ambala", state: "Haryana" },
  { slug: "panipat", city: "Panipat", state: "Haryana" },
  { slug: "rohtak", city: "Rohtak", state: "Haryana" },
  { slug: "hisar", city: "Hisar", state: "Haryana" },
  { slug: "karnal", city: "Karnal", state: "Haryana" },

  // Punjab
  { slug: "ludhiana", city: "Ludhiana", state: "Punjab" },
  { slug: "amritsar", city: "Amritsar", state: "Punjab" },
  { slug: "jalandhar", city: "Jalandhar", state: "Punjab" },
  { slug: "patiala", city: "Patiala", state: "Punjab" },
  { slug: "bathinda", city: "Bathinda", state: "Punjab" },
  { slug: "mohali", city: "Mohali", state: "Punjab" },

  // Himachal Pradesh
  { slug: "shimla", city: "Shimla", state: "Himachal Pradesh" },
  { slug: "manali", city: "Manali", state: "Himachal Pradesh" },
  { slug: "dharamshala", city: "Dharamshala", state: "Himachal Pradesh" },
  { slug: "solan", city: "Solan", state: "Himachal Pradesh" },

  // Uttarakhand
  { slug: "dehradun", city: "Dehradun", state: "Uttarakhand" },
  { slug: "haridwar", city: "Haridwar", state: "Uttarakhand" },
  { slug: "rishikesh", city: "Rishikesh", state: "Uttarakhand" },
  { slug: "roorkee", city: "Roorkee", state: "Uttarakhand" },
  { slug: "haldwani", city: "Haldwani", state: "Uttarakhand" },

  // Jammu & Kashmir / Ladakh
  { slug: "jammu", city: "Jammu", state: "Jammu & Kashmir" },
  { slug: "srinagar", city: "Srinagar", state: "Jammu & Kashmir" },
  { slug: "leh", city: "Leh", state: "Ladakh" },

  // West Bengal (Kolkata featured separately)
  { slug: "howrah", city: "Howrah", state: "West Bengal" },
  { slug: "siliguri", city: "Siliguri", state: "West Bengal" },
  { slug: "durgapur", city: "Durgapur", state: "West Bengal" },
  { slug: "asansol", city: "Asansol", state: "West Bengal" },
  { slug: "bardhaman", city: "Bardhaman", state: "West Bengal" },

  // Bihar
  { slug: "patna", city: "Patna", state: "Bihar" },
  { slug: "gaya", city: "Gaya", state: "Bihar" },
  { slug: "muzaffarpur", city: "Muzaffarpur", state: "Bihar" },
  { slug: "bhagalpur", city: "Bhagalpur", state: "Bihar" },

  // Jharkhand
  { slug: "ranchi", city: "Ranchi", state: "Jharkhand" },
  { slug: "dhanbad", city: "Dhanbad", state: "Jharkhand" },
  { slug: "jamshedpur", city: "Jamshedpur", state: "Jharkhand" },
  { slug: "bokaro", city: "Bokaro", state: "Jharkhand" },

  // Odisha
  { slug: "bhubaneswar", city: "Bhubaneswar", state: "Odisha" },
  { slug: "cuttack", city: "Cuttack", state: "Odisha" },
  { slug: "rourkela", city: "Rourkela", state: "Odisha" },
  { slug: "berhampur", city: "Berhampur", state: "Odisha" },
  { slug: "puri", city: "Puri", state: "Odisha" },
  { slug: "sambalpur", city: "Sambalpur", state: "Odisha" },

  // Assam & Northeast
  { slug: "guwahati", city: "Guwahati", state: "Assam" },
  { slug: "dibrugarh", city: "Dibrugarh", state: "Assam" },
  { slug: "silchar", city: "Silchar", state: "Assam" },
  { slug: "jorhat", city: "Jorhat", state: "Assam" },
  { slug: "imphal", city: "Imphal", state: "Manipur" },
  { slug: "shillong", city: "Shillong", state: "Meghalaya" },
  { slug: "agartala", city: "Agartala", state: "Tripura" },
  { slug: "kohima", city: "Kohima", state: "Nagaland" },
  { slug: "dimapur", city: "Dimapur", state: "Nagaland" },
  { slug: "itanagar", city: "Itanagar", state: "Arunachal Pradesh" },
  { slug: "aizawl", city: "Aizawl", state: "Mizoram" },
  { slug: "gangtok", city: "Gangtok", state: "Sikkim" },

  // Gujarat
  { slug: "ahmedabad", city: "Ahmedabad", state: "Gujarat" },
  { slug: "surat", city: "Surat", state: "Gujarat" },
  { slug: "vadodara", city: "Vadodara", state: "Gujarat" },
  { slug: "rajkot", city: "Rajkot", state: "Gujarat" },
  { slug: "gandhinagar", city: "Gandhinagar", state: "Gujarat" },
  { slug: "bhavnagar", city: "Bhavnagar", state: "Gujarat" },
  { slug: "jamnagar", city: "Jamnagar", state: "Gujarat" },
  { slug: "anand", city: "Anand", state: "Gujarat" },

  // Maharashtra (Mumbai & Pune featured separately)
  { slug: "nagpur", city: "Nagpur", state: "Maharashtra" },
  { slug: "nashik", city: "Nashik", state: "Maharashtra" },
  { slug: "aurangabad", city: "Aurangabad", state: "Maharashtra" },
  { slug: "thane", city: "Thane", state: "Maharashtra" },
  { slug: "navi-mumbai", city: "Navi Mumbai", state: "Maharashtra" },
  { slug: "solapur", city: "Solapur", state: "Maharashtra" },
  { slug: "kolhapur", city: "Kolhapur", state: "Maharashtra" },
  { slug: "amravati", city: "Amravati", state: "Maharashtra" },
  { slug: "nanded", city: "Nanded", state: "Maharashtra" },

  // Goa
  { slug: "panaji", city: "Panaji", state: "Goa" },
  { slug: "margao", city: "Margao", state: "Goa" },

  // Madhya Pradesh
  { slug: "indore", city: "Indore", state: "Madhya Pradesh" },
  { slug: "bhopal", city: "Bhopal", state: "Madhya Pradesh" },
  { slug: "jabalpur", city: "Jabalpur", state: "Madhya Pradesh" },
  { slug: "gwalior", city: "Gwalior", state: "Madhya Pradesh" },
  { slug: "ujjain", city: "Ujjain", state: "Madhya Pradesh" },
  { slug: "rewa", city: "Rewa", state: "Madhya Pradesh" },
  { slug: "sagar", city: "Sagar", state: "Madhya Pradesh" },

  // Chhattisgarh
  { slug: "raipur", city: "Raipur", state: "Chhattisgarh" },
  { slug: "bilaspur", city: "Bilaspur", state: "Chhattisgarh" },
  { slug: "bhilai", city: "Bhilai", state: "Chhattisgarh" },
  { slug: "durg", city: "Durg", state: "Chhattisgarh" },

  // Karnataka (Bangalore featured separately)
  { slug: "mysuru", city: "Mysuru", state: "Karnataka" },
  { slug: "mangalore", city: "Mangalore", state: "Karnataka" },
  { slug: "hubli", city: "Hubli", state: "Karnataka" },
  { slug: "dharwad", city: "Dharwad", state: "Karnataka" },
  { slug: "belagavi", city: "Belagavi", state: "Karnataka" },
  { slug: "kalaburagi", city: "Kalaburagi", state: "Karnataka" },
  { slug: "bellary", city: "Bellary", state: "Karnataka" },
  { slug: "davangere", city: "Davangere", state: "Karnataka" },
  { slug: "tumkur", city: "Tumkur", state: "Karnataka" },
  { slug: "udupi", city: "Udupi", state: "Karnataka" },
  { slug: "shimoga", city: "Shimoga", state: "Karnataka" },

  // Kerala
  { slug: "kochi", city: "Kochi", state: "Kerala" },
  { slug: "thiruvananthapuram", city: "Thiruvananthapuram", state: "Kerala" },
  { slug: "kozhikode", city: "Kozhikode", state: "Kerala" },
  { slug: "thrissur", city: "Thrissur", state: "Kerala" },
  { slug: "kannur", city: "Kannur", state: "Kerala" },
  { slug: "kollam", city: "Kollam", state: "Kerala" },
  { slug: "malappuram", city: "Malappuram", state: "Kerala" },
  { slug: "kottayam", city: "Kottayam", state: "Kerala" },
  { slug: "palakkad", city: "Palakkad", state: "Kerala" },

  // Tamil Nadu (Chennai featured separately)
  { slug: "coimbatore", city: "Coimbatore", state: "Tamil Nadu" },
  { slug: "madurai", city: "Madurai", state: "Tamil Nadu" },
  { slug: "salem", city: "Salem", state: "Tamil Nadu" },
  { slug: "tiruchirappalli", city: "Tiruchirappalli", state: "Tamil Nadu" },
  { slug: "tirunelveli", city: "Tirunelveli", state: "Tamil Nadu" },
  { slug: "vellore", city: "Vellore", state: "Tamil Nadu" },
  { slug: "erode", city: "Erode", state: "Tamil Nadu" },
  { slug: "tiruppur", city: "Tiruppur", state: "Tamil Nadu" },
  { slug: "thoothukudi", city: "Thoothukudi", state: "Tamil Nadu" },
  { slug: "thanjavur", city: "Thanjavur", state: "Tamil Nadu" },
  { slug: "dindigul", city: "Dindigul", state: "Tamil Nadu" },

  // Andhra Pradesh
  { slug: "visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh" },
  { slug: "vijayawada", city: "Vijayawada", state: "Andhra Pradesh" },
  { slug: "guntur", city: "Guntur", state: "Andhra Pradesh" },
  { slug: "tirupati", city: "Tirupati", state: "Andhra Pradesh" },
  { slug: "kakinada", city: "Kakinada", state: "Andhra Pradesh" },
  { slug: "rajahmundry", city: "Rajahmundry", state: "Andhra Pradesh" },
  { slug: "kurnool", city: "Kurnool", state: "Andhra Pradesh" },
  { slug: "nellore", city: "Nellore", state: "Andhra Pradesh" },

  // Telangana (Hyderabad featured separately)
  { slug: "warangal", city: "Warangal", state: "Telangana" },
  { slug: "karimnagar", city: "Karimnagar", state: "Telangana" },
  { slug: "nizamabad", city: "Nizamabad", state: "Telangana" },
  { slug: "khammam", city: "Khammam", state: "Telangana" },

  // Other states
  { slug: "puducherry", city: "Puducherry", state: "Puducherry" },
  { slug: "port-blair", city: "Port Blair", state: "Andaman & Nicobar Islands" },
];

// NRI / Diaspora cities
export const NRI_CITIES: CityEntry[] = [
  // United Kingdom
  { slug: "london", city: "London", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "birmingham-uk", city: "Birmingham", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "manchester-uk", city: "Manchester", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "leicester-uk", city: "Leicester", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "glasgow-uk", city: "Glasgow", state: "Scotland", isNRI: true, country: "United Kingdom" },

  // United States
  { slug: "new-york-usa", city: "New York", state: "New York", isNRI: true, country: "United States" },
  { slug: "new-jersey-usa", city: "New Jersey", state: "New Jersey", isNRI: true, country: "United States" },
  { slug: "chicago-usa", city: "Chicago", state: "Illinois", isNRI: true, country: "United States" },
  { slug: "san-francisco-usa", city: "San Francisco", state: "California", isNRI: true, country: "United States" },
  { slug: "los-angeles-usa", city: "Los Angeles", state: "California", isNRI: true, country: "United States" },
  { slug: "houston-usa", city: "Houston", state: "Texas", isNRI: true, country: "United States" },
  { slug: "dallas-usa", city: "Dallas", state: "Texas", isNRI: true, country: "United States" },
  { slug: "atlanta-usa", city: "Atlanta", state: "Georgia", isNRI: true, country: "United States" },
  { slug: "seattle-usa", city: "Seattle", state: "Washington", isNRI: true, country: "United States" },
  { slug: "boston-usa", city: "Boston", state: "Massachusetts", isNRI: true, country: "United States" },
  { slug: "washington-dc-usa", city: "Washington DC", state: "DC", isNRI: true, country: "United States" },

  // Canada
  { slug: "toronto-canada", city: "Toronto", state: "Ontario", isNRI: true, country: "Canada" },
  { slug: "vancouver-canada", city: "Vancouver", state: "British Columbia", isNRI: true, country: "Canada" },
  { slug: "calgary-canada", city: "Calgary", state: "Alberta", isNRI: true, country: "Canada" },
  { slug: "brampton-canada", city: "Brampton", state: "Ontario", isNRI: true, country: "Canada" },
  { slug: "ottawa-canada", city: "Ottawa", state: "Ontario", isNRI: true, country: "Canada" },

  // Australia
  { slug: "sydney-australia", city: "Sydney", state: "NSW", isNRI: true, country: "Australia" },
  { slug: "melbourne-australia", city: "Melbourne", state: "Victoria", isNRI: true, country: "Australia" },
  { slug: "brisbane-australia", city: "Brisbane", state: "Queensland", isNRI: true, country: "Australia" },
  { slug: "perth-australia", city: "Perth", state: "Western Australia", isNRI: true, country: "Australia" },
  { slug: "adelaide-australia", city: "Adelaide", state: "South Australia", isNRI: true, country: "Australia" },

  // UAE
  { slug: "dubai-uae", city: "Dubai", state: "Dubai", isNRI: true, country: "United Arab Emirates" },
  { slug: "abu-dhabi-uae", city: "Abu Dhabi", state: "Abu Dhabi", isNRI: true, country: "United Arab Emirates" },
  { slug: "sharjah-uae", city: "Sharjah", state: "Sharjah", isNRI: true, country: "United Arab Emirates" },

  // Other GCC / Asia
  { slug: "singapore", city: "Singapore", state: "Singapore", isNRI: true, country: "Singapore" },
  { slug: "kuala-lumpur-malaysia", city: "Kuala Lumpur", state: "Kuala Lumpur", isNRI: true, country: "Malaysia" },
  { slug: "bahrain", city: "Manama", state: "Bahrain", isNRI: true, country: "Bahrain" },
  { slug: "muscat-oman", city: "Muscat", state: "Oman", isNRI: true, country: "Oman" },
  { slug: "kuwait-city", city: "Kuwait City", state: "Kuwait", isNRI: true, country: "Kuwait" },
  { slug: "doha-qatar", city: "Doha", state: "Qatar", isNRI: true, country: "Qatar" },
  { slug: "riyadh-saudi-arabia", city: "Riyadh", state: "Riyadh", isNRI: true, country: "Saudi Arabia" },
  { slug: "new-zealand", city: "Auckland", state: "Auckland", isNRI: true, country: "New Zealand" },
];

export const ALL_CITIES: CityEntry[] = [...INDIAN_CITIES, ...NRI_CITIES];
