import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  InvokeMiddleware,
  ParseParams,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
  Reject
} from '@loopback/rest';
import logger from './logger/logger';
import { TokenService } from './middleware';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  @inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true })
  protected invokeMiddleware: InvokeMiddleware = () => false


  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject('middleware.TokenService')
    private tokenService: TokenService,
  ) { }

  async handle(context: RequestContext) {
    const requestStartTime = Date.now();
    const { request, response } = context;
    const { headers, ip } = request;
    //Log request information
    const referer = headers['referer'];
    logger.info('Request Start Time:', { requestStartTime });
    logger.info('Referer:', { referer });
    logger.info('User Agent:', { userAgent: headers['user-agent'] });
    logger.info('Request IP:', { ipAddress: ip });
    try {
      logger.info('Request received:', {
        method: context.request.method,
        url: context.request.url,
      });
      const { cookie } = headers;
      if (cookie) {
        const userId = this.tokenService.decryptCookie(cookie);
        const token = this.tokenService.createJwtToken(userId);
        context.request.headers.authorization = `Bearer ${token}`;
      }
      // const allowedOrigin = process.env.ALLOWED_ORIGIN;
      // if (referer && referer !== allowedOrigin) {
      //   throw new Error('Referer not allowed');
      // }
      const isMiddlewareFinished = await this.invokeMiddleware(context);
      if (isMiddlewareFinished) return;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
      const completionTime = Date.now();
      logger.info('Response sent:', {
        statusCode: context.response.statusCode,
      });
      // Log completion time
      logger.info('Completion Time:', { completionTime });
    } catch (error) {
      const errorTime = Date.now();

      // Log error time
      logger.error('Error Time:', { errorTime });
      logger.error('Failed to load the application', { error })
      this.reject(context, error);
    }
  }
}