// import { Test } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { User } from './models/user.entity';
// import { UsersService } from './users.service';

// describe('AuthService', () => {
//   let service: AuthService;
//   let fakeUsersService: Partial<UsersService>;
//   beforeEach(async () => {
//     // Create a fake copy of the users service
//     const users: User[] = [];

//     fakeUsersService = {
//       find: (email: string) => {
//         const filteredUsers = users.filter((user) => user.email === email);
//         return Promise.resolve(filteredUsers);
//       },

//       create: (email: string, password: string) => {
//         const user = {
//           id: Math.floor(Math.random() * 9999),
//           email,
//           password,
//         } as User;
//         users.push(user);
//         return Promise.resolve(user);
//       },
//     };

//     const module = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: UsersService,
//           useValue: fakeUsersService,
//         },
//       ],
//     }).compile();

//     service = module.get(AuthService);
//   });

//   it('can create an instance of auth service', async () => {
//     expect(service).toBeDefined();
//   });

//   it('Creates a new user with a salted and hashed password', async () => {
//     const user = await service.signUp('asdf@asdf.com', 'asdf');

//     expect(user.password).not.toEqual('asdf');
//     const [salt, hash] = user.password.split('.');
//     expect(salt).toBeDefined();
//     expect(hash).toBeDefined();
//   });

//   it('Throws an error if user signs up with email that is in use', async () => {
//     await service.signUp('asdf@asdf.com', 'asdf');
//     expect.assertions(1);
//     try {
//       await service.signUp('asdf@asdf.com', 'asdf');
//     } catch (err) {
//       expect(err.toString()).toMatch('BadRequestException: Email in use');
//     }
//   });

//   it('Throws if signIn is called with an unused email', async () => {
//     expect.assertions(1);
//     try {
//       await service.signIn('asdf@asdf.com', 'asdf');
//     } catch (err) {
//       expect(err.toString()).toMatch('NotFoundException: User not found');
//     }
//   });

//   it('Throws if an invalid password is provided', async () => {
//     await service.signUp('adsf@asdf.com', 'otherPass');
//     expect.assertions(1);
//     try {
//       await service.signIn('adsf@asdf.com', 'password');
//     } catch (err) {
//       expect(err.toString()).toMatch('BadRequestException: Wrong password');
//     }
//   });

//   it('returns a user if correct password is provided', async () => {
//     await service.signUp('asdf@asdf.com', 'myPassword');
//     const user = await service.signIn('asdf@asdf.com', 'myPassword');
//     expect(user).toBeDefined();
//   });
// });
