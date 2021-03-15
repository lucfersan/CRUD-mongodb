import { connect } from 'mongoose';

export default async function () {
  await connect('mongodb://localhost:27017/auth-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to database 📦');
}
