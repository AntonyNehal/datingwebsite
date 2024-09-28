// utils/gravatar.js
import md5 from 'md5'; // Make sure you have the md5 package installed

// Function to generate Gravatar URL based on email
export const getGravatarUrl = (email) => {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = md5(trimmedEmail);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`; // Use 'identicon' or another default if no Gravatar is found
};
