import { useTranslation } from "react-i18next";

export function usePasswordsT() {
  const { t } = useTranslation();

  return (key, options = {}) => t(`passwords.${key}`, options);
}
