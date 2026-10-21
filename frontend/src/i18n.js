import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: {
      "Delivery Label": "Delivery Label",
      "From": "From",
      "To": "To",
      "Weight": "Weight",
      "Items": "Items",
      "Priority": "Priority",
      "Date": "Date",
      "Copies": "Copies",
      "Print Label": "Print Label",
      "Order Receipt": "Order Receipt",
      "Customer": "Customer",
      "Phone": "Phone",
      "Address": "Address",
      "Item": "Item",
      "Qty": "Qty",
      "Price": "Price",
      "Total": "Total",
      "No items found": "No items found",
      "Subtotal": "Subtotal",
      "Delivery Fee": "Delivery Fee",
      "Discount": "Discount",
      "Payment Method": "Payment Method",
      "Status": "Status",
      "Thank you for your order!": "Thank you for your order!",
      "For any questions, please contact us at": "For any questions, please contact us at",
      "Print Receipt": "Print Receipt"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n; 