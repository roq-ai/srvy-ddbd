import * as yup from 'yup';

export const vendorInteractionValidationSchema = yup.object().shape({
  interaction_type: yup.string().required(),
  interaction_date: yup.date().required(),
  survey_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
