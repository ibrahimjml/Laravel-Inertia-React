import { useTranslation } from "react-i18next";

export function useAuthT() {
  const { t } = useTranslation();

  return (key, options = {}) => t(`auth.${key}`, options);
}
