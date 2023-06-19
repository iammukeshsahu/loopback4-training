import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'restTesting',
  connector: 'rest',
  baseURL: 'http://localhost:3001',
  crud: false,
  file: './data/db.json'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestTestingDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'restTesting';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.restTesting', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
