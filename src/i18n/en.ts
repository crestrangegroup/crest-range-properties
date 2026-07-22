// English is the base dictionary. Every other language in ui.js is merged over
// this, so a missing key falls back to English rather than rendering blank.

export const EN = {
  navHome: 'Home', navAbout: 'About', navServices: 'Services', navContact: 'Contact',
  navListings: 'Listings', navBuy: 'Buy', navRent: 'Rent', navSell: 'Sell',
  chatCta: 'Agent Live Chat',
  // Preview fix 5: second item in the header's About dropdown, above Our Team.
  navVision: 'Our Vision & Mission',
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
  testiH: 'Clients who closed with us',

  // Item 3 / preview fix 4: the section is titled "Founder's Message"
  // (first-person), distinct from Fatoki's third-person bio page.
  welcomeK: 'Founder’s Message',
  welcomeP: 'We believe that every client deserves personalized attention and a tailor-made solution. Your goals are our goals, and your success is our success. As the Founder of Crest Range Properties, I take pride in the unwavering commitment of our team to uphold the highest standards of integrity, transparency, and professionalism. We are here to guide you through every step of your Real Estate journey, ensuring that your experience with us is not only successful but also enjoyable. Our commitment to “Finding Home Away from Home” extends beyond the properties we offer. It is about creating lasting relationships. We are excited to be part of your story and to help you find your perfect place in this world.',
  welcomeName: 'Olatubosun Fatoki',
  welcomeRole: 'Founder',

  // Item 6: Vision & Mission.
  vmK: 'What drives us',
  visionH: 'Vision',
  visionP: 'Envisioning the Crest of Excellence: At Crest Range Properties, we aspire to redefine the real estate experience by crafting a world where every property holds a unique story, every transaction is a journey, and every dream finds its home. Our vision is to be the beacon of innovation, integrity, and inclusivity in the Real Estate landscape, forging lasting connections with our clients, partners and communities.',
  missionH: 'Mission',
  missionP: 'Empowering Individuals and Families to Achieve Their Real Estate Goals. We are committed to transparency, professionalism, and innovation to help you find your dream home or investment opportunity. Our core values of excellence and integrity guide us in every transaction, making us a reliable partner on your Real Estate journey. Join us in building a future where your Real Estate goals are not only accomplished but also celebrated.',

  svcK: 'What we do', svcH: 'Three disciplines. One standard.',
  s1Name: 'Sales', s2Name: 'Leasing', s3Name: 'Property Management',
  // Item 7 detailed service descriptions. s1 = Sales, s2 = Leasing, s3 = Property Management.
  s1Desc:
    'Crest Range Properties is the ideal partner for those looking to buy or sell real estate in the UAE — from distinguished residences to commercial addresses. Much of what we sell never reaches the portals: our buyers see it first, and our sellers avoid the noise. Pricing counsel is grounded in six years of island-community data, and every negotiation is handled as if the money were our own.',
  /* VERIFY: "six years of island-community data" — pending client confirmation */
  s2Desc:
    'Crest Range Properties offers a versatile collection of residential, commercial, and mixed-use properties, with tenant representation and landlord letting handled end to end. For tenants — often arriving from abroad — we translate communities, commutes, and contracts into plain language. For landlords, we find the right tenant rather than the fastest one, guiding the process from first viewing to signed Tawtheeq.',
  s3Desc:
    'Over the years, our property management services have focused on offering a tailored experience to our clientele, landlords, and tenants. For owners at home and abroad, we run the property so you don’t have to — rent collection, maintenance, inspections, tenant relations, and annual reporting, delivered without drama. Over 140 units are under our management today, most of them owned by clients who first leased or bought through us.',
  /* VERIFY: "over 140 units" — pending client confirmation */
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
  typingLbl: 'James is typing…',
  chatIntro: 'How can I help today? Buying, renting, selling, or something else?',
  chatPlaceholder: 'Type in English…',
  contChat: 'Continue your chat',
  closeQ: 'Close this conversation entirely, or minimize it?',
  closeBtn: 'Close conversation', minBtn: 'Minimize',

  city: 'Abu Dhabi', mapLayer: 'Google Maps · live listings layer',

  // Item 1: titles updated to match the official Company Profile. Names that
  // are not mentioned in the brief (fatoki, dimka, njeri) keep their titles.
  roles: {
    fatoki: 'Founder & Managing Partner / Consultant',
    dimka: 'HR & Administrative Manager | Compliance Officer',
    abe: 'Leasing Manager',
    njeri: 'Leasing Agent',
    okafor: 'Senior Real Estate Officer',
    duruoha: 'Sales Manager',
    smith: 'Leasing Officer',
    // Gift Ofejiro: final designation pending from client.
    gift: 'Designation coming soon',
  },
}

export type Dict = typeof EN
