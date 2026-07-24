// English is the base dictionary. Every other language in ui.js is merged over
// this, so a missing key falls back to English rather than rendering blank.

export const EN = {
  navHome: 'Home', navAbout: 'About', navServices: 'Services', navContact: 'Contact',
  navListings: 'Listings', navBuy: 'Buy', navRent: 'Rent', navSell: 'Sell',
  chatCta: 'Agent Live Chat',
  // Preview fix 5: second item in the header's About dropdown, above Our Team.
  navVision: 'Our Vision & Mission',
  // Careers: third item in the About dropdown; links to the Careers page.
  navCareers: 'Careers',
  // Preview fix 2: persistent affordance on team cards.
  viewProfile: 'View profile',

  heroK: 'Abu Dhabi · Private Brokerage',
  // The official company tagline, replacing the previous headline entirely.
  heroH: 'Finding Home Away from Home',
  heroP: 'Villas, penthouses and high-yield investments across Abu Dhabi’s most coveted communities — sold and let faster, at the numbers you want.',

  searchBtn: 'Search properties', fCommunity: 'Community', fType: 'Property type',
  fBeds: 'Bedrooms', fPrice: 'Price',

  statHomes: 'Homes sold & let', statReturn: 'Return clients',
  statResponse: 'Average response to inquiries',

  featuredK: 'Hand-picked this week', featuredH: 'Featured listings', viewAll: 'View all listings',
  hoodsK: 'Neighbourhood guides', hoodsH: 'Know every street before you buy.', guide: 'Guide',
  insightsK: 'From our desk', insightsH: 'Market insights',
  newsH: 'Weekly Abu Dhabi market intel. No noise.', subscribe: 'Subscribe',
  subscribedMsg: '✓ You’re in. First briefing lands this Sunday.',

  // Item 4: "Why Crest Range Properties" — five pillars, exact copy.
  whyK: 'Why us',
  whyH: 'Why Crest Range Properties',
  whyPillars: [
    { name: 'Local Expertise', desc: 'With a deep understanding of Abu Dhabi’s real estate landscape, we provide insightful advice and market knowledge.' },
    { name: 'Client-Centric Approach', desc: 'Our clients’ satisfaction is paramount. We work closely with you to understand your Real Estate goals and exceed your expectations.' },
    { name: 'Integrity and Transparency', desc: 'Crest Range Properties upholds the highest ethical standards, ensuring transparency in all our dealings.' },
    { name: 'Innovation', desc: 'We embrace technological advancements to streamline processes; making property transactions efficient and convenient for our clients.' },
    { name: 'Professional Team', desc: 'Our dedicated team of Real Estate Professionals is committed to excellence, continuously improving their skills and staying updated with industry trends.' },
  ] as ReadonlyArray<{ name: string; desc: string }>,

  // Item 8: Our Partners.
  partnersK: 'Trusted by',
  partnersH: 'Our partners',

  tagSell: 'Sell', tagRent: 'Rent',
  // Spec row labels. Singular/plural pairs so "1 Bedroom" reads correctly.
  bedroom: 'Bedroom', bedrooms: 'Bedrooms',
  bathroom: 'Bathroom', bathrooms: 'Bathrooms',
  sqftLabel: 'Sq Ft',
  listingsH: 'Properties in Abu Dhabi', updatedToday: 'updated today', allPill: 'All',
  mapView: 'Map view', pinView: 'View listing', propsWord: 'properties',
  noResults: 'No properties match those filters yet.', clearFilters: 'Clear filters',

  sellH: 'Selling? Start with your number.',
  sellP: '60 seconds, no obligation — backed by live Abu Dhabi transaction data. Below: what comparable homes are asking right now.',
  valBtn: 'Reveal my estimate', valEstToday: 'Estimated value today',
  valWant: 'Want the exact number?', reqCall: 'Request a call',
  sellKicker: 'Sell with Crest Range Properties',
  sellIntro: 'Sixty seconds, no obligation. Your estimate is backed by live Abu Dhabi transaction data — then a senior agent takes it from there.',
  valPanelH: 'Your instant valuation',
  valPanelP: 'Choose your community and size. We return a data-backed range in seconds — no forms, no obligation.',
  sellWhyK: 'Why sell with Crest Range Properties', sellWhyH: 'A track record, not a pitch.',
  sellWhyP: 'A boutique brokerage where most business comes from clients we have sold for before.',
  sellHowK: 'How it works', sellHowH: 'From valuation to keys, in four steps.',
  sellStep1: 'Valuation', sellStep1D: 'A precise, data-backed figure for your home — never a guess.',
  sellStep2: 'Listing & Photography', sellStep2D: 'Professional shoot, floor plans and a listing built to sell.',
  sellStep3: 'Marketing', sellStep3D: 'Your home in front of qualified buyers across our network.',
  sellStep4: 'Offer & Close', sellStep4D: 'We negotiate to protect your number and manage the transfer.',
  sellTestiH: 'Sellers who closed with us', sellCtaH: 'Ready to make your move?',
  sellCtaP: 'Talk to a senior agent now, or book a valuation visit at your home.',
  sellBookVisit: 'Book a valuation visit',

  back: 'Back', videoTour: 'Video walkthrough', tour3d: '360° virtual tour',
  aboutProp: 'About the property', amenitiesH: 'Amenities', primeH: 'Prime location',
  reachAgent: 'Reach the agent', callBtn: 'Call', emailBtn: 'Email', whatsBtn: 'WhatsApp',
  bookH: 'Book a private viewing', bookSub: 'Confirmed within 15 minutes, 7 days a week.',
  bookBtn: 'Confirm viewing', bookedH: 'Viewing requested',
  bookedP: 'A specialist will confirm your slot shortly.',
  mortH: 'Mortgage calculator', monthly: 'Estimated monthly payment',
  mDownL: 'Down payment', mTermL: 'Term', mRateL: 'Rate', mLoanW: 'loan',
  ratesNote: 'UAE resident rates from 3.6%',
  verifiedH: 'Verified listing',
  verifiedP: 'Advertisement permit on record with ADREC. Scan to verify this listing.',
  relatedH: 'Related properties', notFoundH: 'We could not find that property.',

  aboutK: 'Our story', aboutH: 'A boutique brokerage built on repeat clients.',
  // Item 2: About intro, replaced word-for-word from the Company Profile.
  aboutP1: 'Crest Range Properties LLC is a dynamic and forward-thinking Real Estate Company based in the vibrant city of Abu Dhabi. Established in 2020, our Company has swiftly grown to become a prominent player in the local Real Estate Market, thanks to our unwavering commitment to excellence and our extensive portfolio of Leasing, Property Management, and Real Estate Sales Services.',
  testiK: 'In their words', testiH: 'Clients who closed with us',

  // Item 3 / preview fix 4: the section is titled "Founder's Message"
  // (first-person), distinct from Fatoki's third-person bio page.
  welcomeK: 'Founder’s Message',
  welcomeP: 'We believe that every client deserves personalized attention and a tailor-made solution. Your goals are our goals, and your success is our success. As the founder of Crest Range Properties, I take pride in the unwavering commitment of our team to uphold the highest standards of integrity, transparency, and professionalism. We are here to guide you through every step of your real estate journey, ensuring that your experience with us is not only successful but also enjoyable. Our commitment to “Finding Home Away from Home” extends beyond the properties we offer. It is about creating lasting relationships. We are excited to be part of your story and to help you find your perfect place in this world.',
  welcomeName: 'Olatubosun Fatoki',
  welcomeRole: 'Founder',

  // Item 6: Vision & Mission.
  vmK: 'What drives us',
  visionH: 'Vision',
  visionP: 'Envisioning the Crest of Excellence: At Crest Range Properties, we aspire to redefine the real estate experience by crafting a world where every property holds a unique story, every transaction is a journey, and every dream finds its home. Our vision is to be the beacon of innovation, integrity, and inclusivity in the Real Estate landscape, forging lasting connections with our clients, partners and communities.',
  missionH: 'Mission',
  missionP: 'Empowering Individuals and Families to Achieve Their Real Estate Goals. We are committed to transparency, professionalism, and innovation to help you find your dream home or investment opportunity. Our core values of excellence and integrity guide us in every transaction, making us a reliable partner on your Real Estate journey. Join us in building a future where your Real Estate goals are not only accomplished but also celebrated.',

  svcK: 'What we do', svcH: 'Three disciplines. One standard.',
  // Preview fix 11: "Sales" renamed to "Sales & Acquisition" (used for the
  // service heading and the above-the-fold strip).
  s1Name: 'Sales & Acquisition', s2Name: 'Leasing', s3Name: 'Property Management',
  // Service descriptions: verbatim from the official Company Profile PDF (round 3
  // reversal). The two earlier VERIFY-flagged claims are gone with the blended
  // copy. s1 = Sales & Acquisition, s2 = Leasing, s3 = Property Management.
  s1Desc:
    'Crest Range Properties is the ideal partner for those looking to buy or sell real estate in the U.A.E. Our experienced sales professionals offer tailored solutions that match buyers with their dream properties and assist sellers in securing the best deals.',
  s2Desc:
    'We offer a versatile collection of properties, including Residential, Commercial and Mixed Used Properties. Our team of leasing experts is dedicated to helping you find the perfect property to suit your needs. We provide comprehensive guidance to make the decision-making process simple and straightforward.',
  s3Desc:
    'Over the years, our property management approach has been built around delivering a seamless and personalized experience for both landlords and tenants. Our dedicated team oversees every aspect of the process, from maintenance coordination and inspections to tenant relations, ensuring properties are well cared for and clients receive reliable, efficient support.',
  included: 'What’s included', sCtaChat: 'Chat with a live agent now', sCtaForm: 'Request a proposal',
  s1B: ['Pricing & comparable analysis', 'Off-market buyer network', 'Offer negotiation & closing', 'Ownership transfer coordination'],
  s2B: ['Tenant sourcing & vetting', 'Tawtheeq contract handling', 'Cheque structuring', 'Renewals & move-in coordination'],
  s3B: ['Rent collection & arrears handling', 'Maintenance & inspections', 'Owner statements & reporting', 'Vacancy marketing'],
  waEyebrow: 'Prefer to chat?', waHeadline: 'Message us on WhatsApp',

  formName: 'Full name', formFirst: 'First name', formLast: 'Last name',
  formPhone: 'Mobile', formEmail: 'Email', formProp: 'Property details', formMsg: 'Message',
  formOther: 'Tell us more', formDate: 'Preferred date',
  formSend: 'Send request', formSentH: 'Request received',
  formSentP: 'We’ll come back to you within 15 minutes.',
  inputsEn: 'Please type in English',
  formRequired: 'Please complete the required fields.',
  propIntro: 'Tell us about your property and we’ll send a tailored management proposal within one business day.',

  teamH: 'The people behind Crest Range Properties',
  teamP: 'A compact senior team — every client works directly with a decision-maker.',

  // About page "Work With Us" teaser (Careers feature, item 4).
  workK: 'Careers',
  workH: 'Work with us',
  workP: 'We are always glad to meet people who love this city and this work. Take a look at our Careers page for current openings.',
  workCta: 'Visit Careers',

  // Careers page (public-facing). New copy is English-first, pending sign-off.
  careersK: 'Careers at Crest Range Properties',
  careersH: 'Finding Where You Belong',
  careersLead:
    'Crest Range Properties is a boutique Abu Dhabi brokerage where every person works close to the decision-making, the clients, and the outcome. We hire for character first: people who are curious about the market, generous with their time, and precise in their follow-through.',
  careersOpenH: 'Open roles',
  careersNoneH: 'No open roles right now',
  careersNoneP:
    'We are not actively hiring at the moment, but great people are always worth knowing. Introduce yourself below and we will reach out when the right seat opens up.',
  careersWhyH: 'What it is like here',
  careersWhy1H: 'Real ownership',
  careersWhy1P: 'Small team, senior clients, and the room to run your own relationships from first call to signed contract.',
  careersWhy2H: 'A market worth mastering',
  careersWhy2P: 'Saadiyat, Yas, Al Reem and Al Raha, learned street by street, with mentors who have closed there for years.',
  careersWhy3H: 'Grow with the firm',
  careersWhy3P: 'We are building for the long term. The people who help build it grow into the roles that come next.',
  // Sample posting (hardcoded until the admin panel manages real postings).
  jobApply: 'Apply', jobApplyH: 'Apply for this role', jobLocation: 'Location', jobType: 'Type',
  jobSampleTitle: 'Leasing Officer',
  jobSampleLocation: 'Abu Dhabi (Al Zahiya office)',
  jobSampleType: 'Full-time',
  jobSampleSummary:
    'Guide tenants and landlords through leasing across Abu Dhabi’s island communities — viewings, negotiation, Tawtheeq, and renewals — with the mentorship to become a market specialist.',
  jobSampleBullets: [
    'Manage leasing enquiries end to end, from first viewing to signed contract',
    'Build lasting relationships with tenants and landlords',
    'Know Al Reem, Al Raha, Saadiyat and Yas street by street',
    'UAE real estate experience welcome but not required — we train for the rest',
  ],
  // Application form (round 4 field set).
  appName: 'Full name', appPhone: 'Phone', appEmail: 'Email', appCv: 'CV / résumé',
  appCvHint: 'PDF or Word, up to 10 MB',
  appNationality: 'Nationality (as per passport)',
  appQualification: 'What is your highest education qualification?',
  appVisa: 'What is your current visa?',
  appCurrentSalary: 'Current salary (AED / month)',
  appSalaryExpect: 'Salary expectations (AED / month)',
  appNotice: 'Notice period',
  appLinkedIn: 'LinkedIn profile URL',
  appOptional: 'optional',
  appSelect: 'Select…',
  // Round 10: free-text "why this role" box. Prompt candidates to be genuine.
  appWhy: 'Why are you interested in this role?',
  appWhyPlaceholder: 'In your own words — keep it real and unscripted, not robotic. What genuinely draws you to Crest Range and this role?',
  // Full-page apply form (fix 34).
  appLead: 'Tell us about yourself and attach your CV. It takes a couple of minutes.',
  appSecPersonal: 'Personal information',
  appSecDetails: 'Application details',
  appSend: 'Apply Now!', appSendSub: 'We usually respond within two weeks.',
  appSentH: 'Application received',
  appSentP: 'Thank you. Our team will review your details and be in touch if there is a fit.',
  appBack: 'Back to Careers',

  // Item B: the Contact page H1 (and About contact block). The footer's
  // contact-column heading is a separate key (footContact) that stays "Contact".
  contactH: 'Talk to Crest Range Properties', addrH: 'Office', phoneH: 'Phone', emailH: 'Email',
  hoursH: 'Hours', followH: 'Follow',
  // Newline-separated so the address and hours always render on their own lines.
  addrVal: 'Office F6-01, Zig Zag Towers\nAl Zahiya (Tourist Club Area)\nOpposite Abu Dhabi Mall\nAbu Dhabi, UAE',
  // Item 10 (hours) + Item 11 (viewings line: em dash, numeral 7).
  hoursVal: 'Monday – Friday, 10:00 AM – 6:00 PM\nViewings by appointment—7 days a week',
  permitNo: 'Permit no.',

  // Item 1.5: team bio pages.
  bioBack: 'Back to team', bioAbout: 'About', teamMemberH: 'Team member',

  footExplore: 'Explore', footCompany: 'Company', footContact: 'Contact', footTeam: 'Our team',
  rights: 'All rights reserved.', footTerms: 'Terms & Conditions', footPrivacy: 'Privacy Policy',
  langMore: 'More languages', legalNote: 'Legal pages are provided in English.',

  chipCall: 'Request a call back', chipVal: 'Instant valuation', chipView: 'Book a viewing',
  chatTitle: 'Crest Concierge', chatOnline: 'Online',
  connecting: 'Connecting you to an agent. Usually 1 to 3 minutes.',
  // Short label for the progress indicator shown while the handoff is in flight.
  chatConnectBar: 'Connecting to James…',
  typingLbl: 'James is typing…',
  chatIntro: 'How can I help today? Buying, renting, selling, or something else?',
  chatPlaceholder: 'Type in English…',
  contChat: 'Continue your chat',
  closeQ: 'Close this conversation entirely, or minimize it?',
  closeBtn: 'Close conversation', minBtn: 'Minimize',
  // Post-farewell auto-close prompt. Buttons are self-describing to avoid any
  // Yes/No ambiguity: one keeps the chat open, one closes it now.
  chatCloseSoon: 'This chat will close soon. Still need help?',
  chatStayOpen: 'Yes, still here', chatCloseNow: 'No, all done',

  city: 'Abu Dhabi', mapLayer: 'Google Maps · live listings layer',

  // Accessibility labels (screen-reader / control labels) — translated so no
  // English is announced or shown in the country picker in other languages.
  searchCountry: 'Search country', rated5: 'Rated 5 out of 5',
  pagePrev: 'Previous page', pageNext: 'Next page',
  menuLbl: 'Menu', navPrimary: 'Primary',

  // Item 1: titles updated to match the official Company Profile. Names that
  // are not mentioned in the brief (fatoki, dimka, njeri) keep their titles.
  roles: {
    fatoki: 'Founder & Managing Partner / Consultant',
    dimka: 'HR & Administrative Manager | Compliance Officer',
    abe: 'Sales Executive & Leasing Manager',
    njeri: 'Leasing Agent',
    okafor: 'Senior Real Estate Officer',
    duruoha: 'Sales Manager',
    smith: 'Leasing Officer',
    // Round 3: Gift Ofejiro's designation confirmed (photo still pending).
    gift: 'Sales & Leasing Agent',
  },
}

export type Dict = typeof EN
