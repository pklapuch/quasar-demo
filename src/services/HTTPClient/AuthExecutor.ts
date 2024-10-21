import { LoginResponse } from 'src/models/LoginResponse';
import { APIRequest, APIResponse } from 'src/api/APIModels';

class QueuedRequest {
  request: APIRequest;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;

  constructor(
    request: APIRequest,
    resolve: (value: unknown) => void,
    reject: (reason?: unknown) => void
  ) {
    this.request = request;
    this.resolve = resolve;
    this.reject = reject;
  }
}

export default function authClient(
  loadToken: () => LoginResponse,
  saveToken: (response: LoginResponse) => void,
  refreshToken: (refreshToken: string) => Promise<LoginResponse>,
  executeRequest: (request: APIRequest) => Promise<APIResponse>
) {
  let queuedRequests: QueuedRequest[] = [];
  let isRefreshingToken = false;

  async function executeWithAuth(request: APIRequest) {
    if (isRefreshingToken) {
      return new Promise((resolve, reject) => {
        const queuedRequest = new QueuedRequest(request, resolve, reject);
        queuedRequests.push(queuedRequest);
      });
    }

    const token = loadToken();
    const response = await signAndExecute(request, token.accessToken);

    if (response.statusCode == 401) {
      isRefreshingToken = true;

      return new Promise((resolve, reject) => {
        const queuedRequest = new QueuedRequest(request, resolve, reject);
        queuedRequests.push(queuedRequest);
        triggerRefreshTokenFlow(token);
      });
    } else {
      return response;
    }
  }

  async function triggerRefreshTokenFlow(token: LoginResponse) {
    try {
      const newToken = await refreshToken(token.refreshToken);
      saveToken(newToken);
      resumeQueuedRequests(newToken);
      isRefreshingToken = false;
    } catch (error) {
      abortQueuedRequests(error);
      isRefreshingToken = false;
    }
  }

  async function resumeQueuedRequests(token: LoginResponse) {
    const requests = queuedRequests;
    queuedRequests = [];

    requests.forEach(function (queuedRequest) {
      resumeQueuedRequest(queuedRequest, token);
    });
  }

  async function resumeQueuedRequest(
    queuedRequest: QueuedRequest,
    token: LoginResponse
  ) {
    try {
      const response = await signAndExecute(
        queuedRequest.request,
        token.accessToken
      );
      queuedRequest.resolve(response);
    } catch (error) {
      queuedRequest.reject(error);
    }
  }

  function abortQueuedRequests(error: unknown) {
    const requests = queuedRequests;
    queuedRequests = [];

    requests.forEach(function (queuedRequest) {
      queuedRequest.reject(error);
    });
  }

  async function signAndExecute(request: APIRequest, accessToken: string) {
    const signedRequest = signRequestWithToken(request, accessToken);
    return await executeRequest(signedRequest);
  }

  function signRequestWithToken(
    request: APIRequest,
    token: string
  ): APIRequest {
    const headers = request.headers ?? {};
    headers['Authorization'] = token;
    return new APIRequest(request.url, request.method, request.body, headers);
  }

  return {
    executeWithAuth,
  };
}
