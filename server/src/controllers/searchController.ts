import { Response } from 'express';
import { IUserRequest } from '../middleware/jwtAuth';
import ProfileModel from '../models/profile';

export const searchProfile = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const query = req.params.query;
    // only for firstName field, idealy should also work for lastName field.
    const aggregate = await ProfileModel.aggregate([
      {
        $search: {
          index: 'name_search',
          autocomplete: {
            query,
            path: 'firstName',
          },
        },
      },
    ]);
    // get back virutal fields
    const hydratedDocs = aggregate.map((doc) =>
      ProfileModel.hydrate(doc)
    );

    return res.json({
      status: 'success',
      data: hydratedDocs,
      message: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errors: err,
      message: null,
    });
  }
};
