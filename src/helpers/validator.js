export const validateName = (inputName) => {
  const name = inputName.trim();
  if (name === '') {
    return 'empty name field';
  }
  if (!/(?!^[\d]+$)^[\w]{3,10}$/i.test(name)) {
    return 'name field can only contain underscores, words, and digits and must not be less than 5 letters cannot also use all numbers';
  }
};

export const validateHqAddress = (inputHqAddress) => {
  const hqAddress = inputHqAddress.trim();
  if (hqAddress === '') {
    return 'empty hqAddress field';
  }
  if (!/^[\w]{5,10}$/i.test(hqAddress)) {
    return 'hqAddress field can only contain underscores, words, and digits and must not be less than 5 letters';
  }
};

export const validateLogoUrl = (inputLogoUrl) => {
  const logoUrl = inputLogoUrl.trim();
  if (logoUrl === '') {
    return 'empty logoUrl field';
  }
};
