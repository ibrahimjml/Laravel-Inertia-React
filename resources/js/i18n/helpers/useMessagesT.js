import { useTranslation } from "react-i18next";

export function useMessagesT() {
  const { t } = useTranslation();

 return (key, options = {}) => t(`messages.${key}`, options);
}
