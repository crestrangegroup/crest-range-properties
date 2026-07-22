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
