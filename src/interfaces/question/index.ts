import { AnswerInterface } from 'interfaces/answer';
import { SurveyInterface } from 'interfaces/survey';
import { GetQueryInterface } from 'interfaces';

export interface QuestionInterface {
  id?: string;
  text: string;
  type: string;
  survey_id: string;
  created_at?: any;
  updated_at?: any;
  answer?: AnswerInterface[];
  survey?: SurveyInterface;
  _count?: {
    answer?: number;
  };
}

export interface QuestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  text?: string;
  type?: string;
  survey_id?: string;
}
