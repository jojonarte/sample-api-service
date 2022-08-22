import { User } from "src/database/models/user";
import { userRepository } from "src/database/repositories/users";
import { generateNewAccessToken } from "src/services/internal/access-tokens";


interface UserWithTokens {
    user: User;
    accessToken: string;
}

const createUser = async (params: Partial<User> = { username: 'jojo', password: 'test' }): Promise<User> => {
  const user = await userRepository.insert({
    ...params,
  }).returning('*')

  return user
}

export const createUserWithTokens = async (params?: Partial<User>): Promise<UserWithTokens> => {
  const user = await createUser(params)
  const accessToken = generateNewAccessToken(user.id)

  return {
    user,
    accessToken: accessToken.token,
  }
}