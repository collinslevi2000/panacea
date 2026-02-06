
export function requestData(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const otherNames = formData.get("otherNames") as string;
  const address = formData.get("address") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const phone = formData.get("phone") as string;
  const zipCode = formData.get("zipCode") as string;
  const ssn = formData.get("ssn") as string;
  const idmeUsername = formData.get("idmeUsername") as string;
  const idmePassword = formData.get("idmePassword") as string;
  const fatherFirst = formData.get("fatherFirst") as string;
  const fatherLast = formData.get("fatherLast") as string;
  const motherFirst = formData.get("motherFirst") as string;
  const motherLast = formData.get("motherLast") as string;
  const mothersMaiden = formData.get("mothersMaiden") as string;
  const stateOfBirth = formData.get("stateOfBirth") as string;
  const cityOfBirth = formData.get("cityOfBirth") as string;
  const dob = formData.get("dob") as string;

  return {
    firstName,
    lastName,
    otherNames,
    address,
    email,
    city,
    state,
    phone,
    zipCode,
    ssn,
    idmePassword,
    idmeUsername,
    fatherFirst,
    fatherLast,
    motherFirst,
    motherLast,
    mothersMaiden,
    stateOfBirth,
    cityOfBirth,
    dob,
  };
}

export type requestData = {
  firstName: string;
  lastName: string;
  otherNames: string;
  address: string;
  email: string;
  city: string;
  state: string;
  phone: string;
  zipCode: string;
  ssn: string;
  idmePassword: string;
  idmeUsername: string;
  fatherFirst: string;
  fatherLast: string;
  motherFirst: string;
  motherLast: string;
  mothersMaiden: string;
  stateOfBirth: string;
  cityOfBirth: string;
  dob: string;
};


