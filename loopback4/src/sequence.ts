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
} from '@loopback/rest';


const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  @inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true })
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send
  ) { }

  async handle(context: RequestContext) {
    const requestStartTime = Date.now();
    const { request, response } = context;
    const { headers, ip } = request;
    //Log request information
    const referer = headers['referer'];
    console.log('Request Start Time:', requestStartTime);
    console.log('Referer:', referer);
    console.log('User Agent:', headers['user-agent']);
    console.log('Request IP:', ip);
    try {
      const allowedOrigin = process.env.ALLOWED_ORIGIN;
      if (referer !== allowedOrigin) {
        throw new Error('Referer not allowed');
      }
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
      const completionTime = Date.now();

      // Log completion time
      console.log('Completion Time:', completionTime);
    } catch (error) {
      const errorTime = Date.now();

      // Log error time
      console.log('Error Time:', errorTime);

      throw error;
    }
  }
}