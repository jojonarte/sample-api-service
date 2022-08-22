import { User } from "src/database/models/user";
import { userRepository } from "src/database/repositories/users";
import { Operation } from "src/operations/operation";
import { AccessToken, generateNewAccessToken } from "src/services/internal/access-tokens";
import { comparePasswords } from "src/utils/crypto";
import { InvalidCredentialsError } from "src/utils/errors";

interface UsernamePasswordRequest {
    username: string;
    password: string;
}

type Input = UsernamePasswordRequest
interface Output {
    user: User
    accessToken: AccessToken
}
class CreateSession extends Operation<Input, Output> {

  protected async run(requestData: Input): Promise<Output> {
    const user = await userRepository.findByUsername(requestData.username)

    if (!user) {
        throw new InvalidCredentialsError('Login failed')
    }  
    if (!(await comparePasswords(requestData.password, user?.password ?? ''))) {
        throw new InvalidCredentialsError('Login failed')
    }

    const accessToken = generateNewAccessToken(user?.id)
    console.log('generated access token' + accessToken.token + ' expires at ' + accessToken.expiresAt)

    return {
        user,
        accessToken,
    }
  }
}

export const createSession = new CreateSession();