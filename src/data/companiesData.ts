import { Company } from '../types';
import { mncSemiconductors } from './companies/mncSemiconductor';
import { edaAndIPCompanies } from './companies/edaAndIP';
import { fablessStartups } from './companies/fablessStartups';
import { designServicesAndOSAT } from './companies/designServicesAndOSAT';
import { embeddedAndRobotics } from './companies/embeddedAndRobotics';

export {
  mncSemiconductors,
  edaAndIPCompanies,
  fablessStartups,
  designServicesAndOSAT,
  embeddedAndRobotics
};

export const initialCompanies: Company[] = [
  ...mncSemiconductors,
  ...edaAndIPCompanies,
  ...fablessStartups,
  ...designServicesAndOSAT,
  ...embeddedAndRobotics
];
