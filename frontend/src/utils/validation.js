export function validateUrlEntry(data) {
  for (let i = 0; i < data.length; i++) {
    const { originalUrl, validity, shortcode } = data[i];

    if (!originalUrl || !validity || !shortcode) {
      return {
        valid: false,
        message: `All fields are required for entry ${i + 1}`,
      };
    }

    try {
      new URL(originalUrl);
    } catch {
      return {
        valid: false,
        message: `Invalid URL at entry ${i + 1}`,
      };
    }

    if (isNaN(validity) || Number(validity) <= 0) {
      return {
        valid: false,
        message: `Validity must be a positive number at entry ${i + 1}`,
      };
    }

    if (!/^[a-zA-Z0-9_-]{3,15}$/.test(shortcode)) {
      return {
        valid: false,
        message: `Shortcode must be 3-15 characters (letters, numbers, _, -) at entry ${i + 1}`,
      };
    }
  }

  return { valid: true };
}
