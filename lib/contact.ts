// Change this one setting when moving to a custom-domain address.
export const contactRecipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL
  || ["yukimain29", "gmail.com"].join("@");

// Consultation preferences, in Japan time. Edit here to change available choices.
export const consultationTimes = [
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00",
];
