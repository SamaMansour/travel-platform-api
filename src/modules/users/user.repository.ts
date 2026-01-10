import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  create(data: Partial<User>, session?: ClientSession) {
    return this.userModel.create(
      [data],
      session ? { session } : undefined,
    ).then(res => res[0]);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }


  findAll() {
    return this.userModel.find().lean();
  }
  softDelete(id: string) {
  return this.userModel.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true },
  );
}

findAllActive() {
  return this.userModel.find({ isDeleted: false }).lean();
}

findByEmailWithPassword(email: string) {
  return this.userModel
    .findOne({ email })
    .select('+password')
    .lean();
}


}
