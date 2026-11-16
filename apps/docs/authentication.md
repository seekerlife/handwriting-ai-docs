# Authentication

Send the API key on every render request.

```http
Authorization: Bearer hw_live_YOUR_KEY
```

Keys start with `hw_live_`. A key is issued after you [request access](https://handwriting-ai.com/api-access). A website login does not act as an API key. API access is separate from a Handwriting AI subscription.

Keep the key on your server. Do not put it in a browser app, a mobile app, or a public repository.

`GET /v1/status` does not use a key. It returns the contract version when the service is reachable.

```bash
curl -sS https://api.handwriting-ai.com/v1/status
```

```json
{ "status": "ok", "version": "1.0.0" }
```

## Request id

Send `X-Request-ID` when you want to match a call with your own logs. Use a new value for each call. The response sends the same value back in `X-Request-ID` and, on errors, in `error.request_id`. If you omit the header, the server creates an id and returns it.

## Download links

A render response contains HTTPS links, not the file itself. Anyone who has a link can download that file until `expires_at`. Treat the link like a password for that one file: do not log it in a public system or place it on a page you do not control. The download request does not use the API key.

A key that has not been enabled for rendering receives `403` with `access_not_enabled`. Email [support@handwriting-ai.com](mailto:support@handwriting-ai.com) and include the `request_id`.
