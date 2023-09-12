import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createVendorInteraction } from 'apiSdk/vendor-interactions';
import { vendorInteractionValidationSchema } from 'validationSchema/vendor-interactions';
import { SurveyInterface } from 'interfaces/survey';
import { UserInterface } from 'interfaces/user';
import { getSurveys } from 'apiSdk/surveys';
import { getUsers } from 'apiSdk/users';
import { VendorInteractionInterface } from 'interfaces/vendor-interaction';

function VendorInteractionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VendorInteractionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVendorInteraction(values);
      resetForm();
      router.push('/vendor-interactions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VendorInteractionInterface>({
    initialValues: {
      interaction_type: '',
      interaction_date: new Date(new Date().toDateString()),
      survey_id: (router.query.survey_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: vendorInteractionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Vendor Interactions',
              link: '/vendor-interactions',
            },
            {
              label: 'Create Vendor Interaction',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Vendor Interaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.interaction_type}
            label={'Interaction Type'}
            props={{
              name: 'interaction_type',
              placeholder: 'Interaction Type',
              value: formik.values?.interaction_type,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="interaction_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Interaction Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.interaction_date ? new Date(formik.values?.interaction_date) : null}
              onChange={(value: Date) => formik.setFieldValue('interaction_date', value)}
            />
          </FormControl>
          <AsyncSelect<SurveyInterface>
            formik={formik}
            name={'survey_id'}
            label={'Select Survey'}
            placeholder={'Select Survey'}
            fetcher={getSurveys}
            labelField={'title'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/vendor-interactions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'vendor_interaction',
    operation: AccessOperationEnum.CREATE,
  }),
)(VendorInteractionCreatePage);
