import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { surveyValidationSchema } from 'validationSchema/surveys';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSurveys();
    case 'POST':
      return createSurvey();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSurveys() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.survey
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'survey'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createSurvey() {
    await surveyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.question?.length > 0) {
      const create_question = body.question;
      body.question = {
        create: create_question,
      };
    } else {
      delete body.question;
    }
    if (body?.vendor_interaction?.length > 0) {
      const create_vendor_interaction = body.vendor_interaction;
      body.vendor_interaction = {
        create: create_vendor_interaction,
      };
    } else {
      delete body.vendor_interaction;
    }
    const data = await prisma.survey.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
