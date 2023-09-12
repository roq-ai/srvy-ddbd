import * as yup from 'yup';

export const answerValidationSchema = yup.object().shape({
  text: yup.string().required(),
  question_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
