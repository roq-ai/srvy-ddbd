import * as yup from 'yup';

export const questionValidationSchema = yup.object().shape({
  text: yup.string().required(),
  type: yup.string().required(),
  survey_id: yup.string().nullable().required(),
});
