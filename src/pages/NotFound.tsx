import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { ROUTES } from '../routes'
import PageHead from '../components/PageHead'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <>
      <PageHead title="404" />
      <section className="section">
        <div className="wrap stack" style={{ gap: 20, alignItems: 'flex-start', minHeight: '46vh' }}>
          <p className="kicker">404</p>
          <h1 className="h2">{t.notFoundH}</h1>
          <div className="row" style={{ gap: 12 }}>
            <Link className="btn btn-primary btn-inline" to={ROUTES.home}>
              {t.navHome}
            </Link>
            <Link className="btn btn-outline btn-inline" to={ROUTES.listings}>
              {t.navListings}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
