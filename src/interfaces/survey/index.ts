import { QuestionInterface } from 'interfaces/question';
import { VendorInteractionInterface } from 'interfaces/vendor-interaction';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SurveyInterface {
  id?: string;
  title: string;
  description?: string;
  status: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  question?: QuestionInterface[];
  vendor_interaction?: VendorInteractionInterface[];
  organization?: OrganizationInterface;
  _count?: {
    question?: number;
    vendor_interaction?: number;
  };
}

export interface SurveyGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  organization_id?: string;
}
