import firebase from 'firebase/compat/app';
import 'firebase/auth';

export const AuthService = {
  createUserWithEmailAndPassword: async (email, password) => {
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('create user: ', email);
      console.log('user: ', userCred.user);
      await userCred.user.sendEmailVerification({
        url: 'www.mmortuaryservices.netlify.app',
      });
      return {
        user: userCred.user,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  },
};
