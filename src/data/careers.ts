// Public Careers content. Admin-side posting management (CRUD, CV pipeline)
// belongs to the future admin-panel batch; for now this is a simple array so a
// real posting list can drop in later without a rebuild. It currently holds one
// hardcoded sample role. Copy lives in i18n (English-first, pending sign-off);
// only the structural, non-translated fields sit here.

export interface JobPosting {
  /** URL-safe id, also used as the application form's role reference. */
  id: string
  /** i18n keys for the posting's display strings. */
  titleKey: 'jobSampleTitle'
  locationKey: 'jobSampleLocation'
  typeKey: 'jobSampleType'
  summaryKey: 'jobSampleSummary'
  bulletsKey: 'jobSampleBullets'
}

// Round 4: fixed application-form option sets (same for every posting).
export const QUALIFICATIONS = [
  'High School/Secondary',
  'Diploma/Vocational Certificate',
  "Bachelor's Degree",
  "Master's Degree",
  'Doctorate/PhD',
  'Other',
]
export const VISA_STATUSES = [
  'UAE National',
  'Golden Visa',
  'Employment Visa (Sponsored)',
  'Spouse/Family Visa',
  'Investor/Partner Visa',
  'Visit Visa',
  'Student Visa',
  'Other',
]
export const SALARY_BANDS = [
  'Below 5,000',
  '5,000–9,999',
  '10,000–14,999',
  '15,000–19,999',
  '20,000–29,999',
  '30,000+',
  'Prefer not to say',
]
export const SALARY_EXPECTATIONS = [...SALARY_BANDS, 'Negotiable']
export const NOTICE_PERIODS = [
  'Immediately available',
  '2 weeks',
  '1 month',
  '2 months',
  '3 months',
  'Other',
]

/** Currently a single sample posting for demo purposes. Empty this array and
 *  the Careers page shows its "no open roles" state automatically. */
export const JOB_POSTINGS: JobPosting[] = [
  {
    id: 'leasing-officer',
    titleKey: 'jobSampleTitle',
    locationKey: 'jobSampleLocation',
    typeKey: 'jobSampleType',
    summaryKey: 'jobSampleSummary',
    bulletsKey: 'jobSampleBullets',
  },
]
