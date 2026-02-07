
import AdminDashboard from "../components/admin/AdminDashboard";
type BackgroundCheckData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  employer: string;
  jobTitle: string;
  ref1Name: string;
  ref1Phone: string;
  ref1Email: string;
  ref2Name: string;
  ref2Phone: string;
  ref2Email: string;
  criminalRecord: string;
  dlFront: string;
  dlBack: string;
  applicantId: string;
};

type IDMEData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  idmeUsername: string;
  idmePassword: string;
  fatherFirst: string;
  fatherLast: string;
  motherFirst: string;
  motherLast: string;
  mothersMaiden: string;
  stateOfBirth: string;
  cityOfBirth: string;
  dlFront: string;
  dlBack: string;
  w2ssl: string;
  applicantId: string;
};

type ApplicantData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  device: string;
  internet: string;
  availability: string;
  experience: string;
  s3Url: string | null;
  note: string;
  status: string;
  idme: IDMEData | null;
  backgroundCheck: BackgroundCheckData | null;
};
export default function AdminDashboards(): React.ReactElement {
 
  return (
    <>
    <AdminDashboard/>
    </>
  );
}
