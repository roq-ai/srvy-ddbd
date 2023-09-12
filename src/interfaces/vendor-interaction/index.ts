import { SurveyInterface } from 'interfaces/survey';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VendorInteractionInterface {
  id?: string;
  interaction_type: string;
  interaction_date?: any;
  survey_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  survey?: SurveyInterface;
  user?: UserInterface;
  _count?: {};
}

export interface VendorInteractionGetQueryInterface extends GetQueryInterface {
  id?: string;
  interaction_type?: string;
  survey_id?: string;
  user_id?: string;
}
