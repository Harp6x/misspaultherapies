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

  // Other states / UTs
  { slug: "puducherry", city: "Puducherry", state: "Puducherry" },
  { slug: "port-blair", city: "Port Blair", state: "Andaman & Nicobar Islands" },

  // ── Additional Indian cities (Tier 2/3 expansion) ──

  // More Uttar Pradesh
  { slug: "firozabad", city: "Firozabad", state: "Uttar Pradesh" },
  { slug: "jhansi", city: "Jhansi", state: "Uttar Pradesh" },
  { slug: "etawah", city: "Etawah", state: "Uttar Pradesh" },
  { slug: "sultanpur", city: "Sultanpur", state: "Uttar Pradesh" },
  { slug: "ayodhya", city: "Ayodhya", state: "Uttar Pradesh" },

  // More Rajasthan
  { slug: "sikar", city: "Sikar", state: "Rajasthan" },
  { slug: "pali", city: "Pali", state: "Rajasthan" },
  { slug: "chittorgarh", city: "Chittorgarh", state: "Rajasthan" },

  // More Madhya Pradesh
  { slug: "satna", city: "Satna", state: "Madhya Pradesh" },
  { slug: "dewas", city: "Dewas", state: "Madhya Pradesh" },
  { slug: "murwara", city: "Murwara", state: "Madhya Pradesh" },
  { slug: "chhindwara", city: "Chhindwara", state: "Madhya Pradesh" },

  // More Chhattisgarh
  { slug: "korba", city: "Korba", state: "Chhattisgarh" },
  { slug: "rajnandgaon", city: "Rajnandgaon", state: "Chhattisgarh" },

  // More Jharkhand
  { slug: "hazaribagh", city: "Hazaribagh", state: "Jharkhand" },
  { slug: "deoghar", city: "Deoghar", state: "Jharkhand" },
  { slug: "giridih", city: "Giridih", state: "Jharkhand" },

  // More Bihar
  { slug: "purnia", city: "Purnia", state: "Bihar" },
  { slug: "darbhanga", city: "Darbhanga", state: "Bihar" },
  { slug: "arrah", city: "Arrah", state: "Bihar" },
  { slug: "begusarai", city: "Begusarai", state: "Bihar" },

  // More West Bengal
  { slug: "kharagpur", city: "Kharagpur", state: "West Bengal" },
  { slug: "haldia", city: "Haldia", state: "West Bengal" },
  { slug: "baharampur", city: "Baharampur", state: "West Bengal" },
  { slug: "kalyani", city: "Kalyani", state: "West Bengal" },

  // More Uttarakhand
  { slug: "nainital", city: "Nainital", state: "Uttarakhand" },
  { slug: "rudrapur", city: "Rudrapur", state: "Uttarakhand" },
  { slug: "kashipur", city: "Kashipur", state: "Uttarakhand" },

  // More Himachal Pradesh
  { slug: "mandi", city: "Mandi", state: "Himachal Pradesh" },
  { slug: "kullu", city: "Kullu", state: "Himachal Pradesh" },
  { slug: "hamirpur-hp", city: "Hamirpur", state: "Himachal Pradesh" },

  // More Gujarat
  { slug: "junagadh", city: "Junagadh", state: "Gujarat" },
  { slug: "navsari", city: "Navsari", state: "Gujarat" },
  { slug: "mehsana", city: "Mehsana", state: "Gujarat" },
  { slug: "bharuch", city: "Bharuch", state: "Gujarat" },

  // More Maharashtra
  { slug: "sangli", city: "Sangli", state: "Maharashtra" },
  { slug: "latur", city: "Latur", state: "Maharashtra" },
  { slug: "ahmednagar", city: "Ahmednagar", state: "Maharashtra" },
  { slug: "chandrapur", city: "Chandrapur", state: "Maharashtra" },
  { slug: "parbhani", city: "Parbhani", state: "Maharashtra" },

  // More Karnataka
  { slug: "raichur", city: "Raichur", state: "Karnataka" },
  { slug: "bidar", city: "Bidar", state: "Karnataka" },
  { slug: "hassan", city: "Hassan", state: "Karnataka" },
  { slug: "mandya", city: "Mandya", state: "Karnataka" },

  // More Tamil Nadu
  { slug: "cuddalore", city: "Cuddalore", state: "Tamil Nadu" },
  { slug: "nagercoil", city: "Nagercoil", state: "Tamil Nadu" },
  { slug: "hosur", city: "Hosur", state: "Tamil Nadu" },
  { slug: "kumbakonam", city: "Kumbakonam", state: "Tamil Nadu" },

  // More Andhra Pradesh
  { slug: "anantapur", city: "Anantapur", state: "Andhra Pradesh" },
  { slug: "ongole", city: "Ongole", state: "Andhra Pradesh" },
  { slug: "eluru", city: "Eluru", state: "Andhra Pradesh" },

  // More Telangana
  { slug: "mahbubnagar", city: "Mahbubnagar", state: "Telangana" },
  { slug: "adilabad", city: "Adilabad", state: "Telangana" },
  { slug: "siddipet", city: "Siddipet", state: "Telangana" },

  // More Northeast
  { slug: "tezpur", city: "Tezpur", state: "Assam" },
  { slug: "nagaon", city: "Nagaon", state: "Assam" },
  { slug: "tinsukia", city: "Tinsukia", state: "Assam" },
  { slug: "tura", city: "Tura", state: "Meghalaya" },
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

  // ── Additional NRI cities ──

  // More United States
  { slug: "austin-usa", city: "Austin", state: "Texas", isNRI: true, country: "United States" },
  { slug: "denver-usa", city: "Denver", state: "Colorado", isNRI: true, country: "United States" },
  { slug: "phoenix-usa", city: "Phoenix", state: "Arizona", isNRI: true, country: "United States" },
  { slug: "san-diego-usa", city: "San Diego", state: "California", isNRI: true, country: "United States" },
  { slug: "miami-usa", city: "Miami", state: "Florida", isNRI: true, country: "United States" },
  { slug: "san-jose-usa", city: "San Jose", state: "California", isNRI: true, country: "United States" },
  { slug: "detroit-usa", city: "Detroit", state: "Michigan", isNRI: true, country: "United States" },
  { slug: "philadelphia-usa", city: "Philadelphia", state: "Pennsylvania", isNRI: true, country: "United States" },
  { slug: "charlotte-usa", city: "Charlotte", state: "North Carolina", isNRI: true, country: "United States" },
  { slug: "columbus-usa", city: "Columbus", state: "Ohio", isNRI: true, country: "United States" },
  { slug: "raleigh-usa", city: "Raleigh", state: "North Carolina", isNRI: true, country: "United States" },
  { slug: "nashville-usa", city: "Nashville", state: "Tennessee", isNRI: true, country: "United States" },
  { slug: "minneapolis-usa", city: "Minneapolis", state: "Minnesota", isNRI: true, country: "United States" },
  { slug: "portland-usa", city: "Portland", state: "Oregon", isNRI: true, country: "United States" },
  { slug: "pittsburgh-usa", city: "Pittsburgh", state: "Pennsylvania", isNRI: true, country: "United States" },

  // More Canada
  { slug: "edmonton-canada", city: "Edmonton", state: "Alberta", isNRI: true, country: "Canada" },
  { slug: "mississauga-canada", city: "Mississauga", state: "Ontario", isNRI: true, country: "Canada" },
  { slug: "surrey-canada", city: "Surrey", state: "British Columbia", isNRI: true, country: "Canada" },
  { slug: "winnipeg-canada", city: "Winnipeg", state: "Manitoba", isNRI: true, country: "Canada" },
  { slug: "montreal-canada", city: "Montreal", state: "Quebec", isNRI: true, country: "Canada" },
  { slug: "halifax-canada", city: "Halifax", state: "Nova Scotia", isNRI: true, country: "Canada" },
  { slug: "markham-canada", city: "Markham", state: "Ontario", isNRI: true, country: "Canada" },

  // More United Kingdom
  { slug: "leeds-uk", city: "Leeds", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "edinburgh-uk", city: "Edinburgh", state: "Scotland", isNRI: true, country: "United Kingdom" },
  { slug: "bristol-uk", city: "Bristol", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "southall-uk", city: "Southall", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "coventry-uk", city: "Coventry", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "cardiff-uk", city: "Cardiff", state: "Wales", isNRI: true, country: "United Kingdom" },
  { slug: "nottingham-uk", city: "Nottingham", state: "England", isNRI: true, country: "United Kingdom" },
  { slug: "reading-uk", city: "Reading", state: "England", isNRI: true, country: "United Kingdom" },

  // More Australia
  { slug: "gold-coast-australia", city: "Gold Coast", state: "Queensland", isNRI: true, country: "Australia" },
  { slug: "canberra-australia", city: "Canberra", state: "ACT", isNRI: true, country: "Australia" },
  { slug: "hobart-australia", city: "Hobart", state: "Tasmania", isNRI: true, country: "Australia" },

  // Europe
  { slug: "berlin-germany", city: "Berlin", state: "Berlin", isNRI: true, country: "Germany" },
  { slug: "amsterdam-netherlands", city: "Amsterdam", state: "North Holland", isNRI: true, country: "Netherlands" },
  { slug: "dublin-ireland", city: "Dublin", state: "Leinster", isNRI: true, country: "Ireland" },
  { slug: "paris-france", city: "Paris", state: "Île-de-France", isNRI: true, country: "France" },
  { slug: "zurich-switzerland", city: "Zurich", state: "Zurich", isNRI: true, country: "Switzerland" },
  { slug: "stockholm-sweden", city: "Stockholm", state: "Stockholm", isNRI: true, country: "Sweden" },
  { slug: "frankfurt-germany", city: "Frankfurt", state: "Hesse", isNRI: true, country: "Germany" },

  // Africa
  { slug: "nairobi-kenya", city: "Nairobi", state: "Nairobi", isNRI: true, country: "Kenya" },
  { slug: "johannesburg-south-africa", city: "Johannesburg", state: "Gauteng", isNRI: true, country: "South Africa" },
  { slug: "durban-south-africa", city: "Durban", state: "KwaZulu-Natal", isNRI: true, country: "South Africa" },

  // More Asia
  { slug: "bangkok-thailand", city: "Bangkok", state: "Bangkok", isNRI: true, country: "Thailand" },
  { slug: "hong-kong", city: "Hong Kong", state: "Hong Kong", isNRI: true, country: "Hong Kong" },
  { slug: "tokyo-japan", city: "Tokyo", state: "Tokyo", isNRI: true, country: "Japan" },
  { slug: "jakarta-indonesia", city: "Jakarta", state: "Jakarta", isNRI: true, country: "Indonesia" },
  { slug: "manila-philippines", city: "Manila", state: "Metro Manila", isNRI: true, country: "Philippines" },

  // More New Zealand
  { slug: "wellington-nz", city: "Wellington", state: "Wellington", isNRI: true, country: "New Zealand" },
  { slug: "christchurch-nz", city: "Christchurch", state: "Canterbury", isNRI: true, country: "New Zealand" },

  // More Saudi Arabia / GCC
  { slug: "jeddah-saudi-arabia", city: "Jeddah", state: "Makkah", isNRI: true, country: "Saudi Arabia" },
  { slug: "dammam-saudi-arabia", city: "Dammam", state: "Eastern Province", isNRI: true, country: "Saudi Arabia" },
];

export const ALL_CITIES: CityEntry[] = [...INDIAN_CITIES, ...NRI_CITIES];
