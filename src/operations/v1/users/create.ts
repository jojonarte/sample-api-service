import { User } from "src/database/models/user";
import { userRepository } from "src/database/repositories/users";
import { Operation } from "src/operations/operation";
import { AccessToken, generateNewAccessToken } from "src/services/internal/access-tokens";
import { BadRequestError } from "src/utils/errors";

interface Input extends User {}
interface Output {
    user: User
    accessToken: AccessToken
}
class CreateUser extends Operation<Input, Output> {
  protected async run(inputData: Input): Promise<Output> {
    try {
      const newUser = await userRepository.insert(inputData)
      const accessToken = generateNewAccessToken(newUser?.id)
      console.log('generated access token' + accessToken.token + ' expires at ' + accessToken.expiresAt)
  
  
      return {
        user: newUser,
        accessToken
      }
    } catch (err) {
      throw new BadRequestError('Invalid user')
    }
  }
}

export const createUser = new CreateUser()
