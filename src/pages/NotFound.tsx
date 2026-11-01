import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { Icon } from "../components/ui";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-6xl place-content-center gap-6 px-4 py-24 text-center">
      <p className="font-mono text-7xl font-bold text-accent">404</p>
      <h1 className="font-display text-3xl font-bold">{t("nf.title")}</h1>
      <Link to="/" className="btn-primary mx-auto"><Icon name="home" className="text-[20px]" />{t("nf.back")}</Link>
    </main>
  );
}
