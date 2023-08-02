import * as dotenv from 'dotenv';

export class ConfigurationService {
  constructor(private env: { [key: string]: string }) {}

  public get(key: string): string {
    return this.env[key];
  }
}

const environment = process.env.NODE_ENV ?? '';
dotenv.config({ path: `environments/${environment}.env` });

const ConfigurationServiceStatic = new ConfigurationService(process.env);
export { ConfigurationServiceStatic };
