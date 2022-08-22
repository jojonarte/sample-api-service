import { Config, getEnvironmentValue } from '.';

const config: Config = {
  appName: 'api-service',
  env: 'local',
  auth: {
    commonTokenLength: 20,
    accessTokenExpiration: Number(getEnvironmentValue("ACCESS_TOKEN_EXPIRATION", "3600")),
    pepper: getEnvironmentValue("PEPPER", "496ba1dd1953e309d528370d96dd6e6f0bbbf693759a54f96e07235a6f201b9a94fdf8"),
    saltRounds: 10,
    refreshTokenExpiration: Number(getEnvironmentValue("REFRESH_TOKEN_EXPIRATION", "604800"))
  },
  database: {
    url: getEnvironmentValue('DATABASE_URL', 'postgres://postgres:password@postgres/development')
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug'
    }
  },
  server: {
    port: Number(getEnvironmentValue('PORT', '3002'))
  }
}

export = config