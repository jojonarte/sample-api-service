import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { config } from 'src/config'

const pepperify = (str: string): string =>
  crypto
    .createHmac('sha1', config.auth.pepper)
    .update(str)
    .digest('hex')

export const comparePasswords =
  (plaintext: string, ciphertext: string): Promise<boolean> =>
    bcrypt.compare(pepperify(plaintext), ciphertext)

export const hashPassword = (plaintext: string): Promise<string> =>
  bcrypt.hash(pepperify(plaintext), config.auth.saltRounds)