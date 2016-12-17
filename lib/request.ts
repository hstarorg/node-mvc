import net = require('net');
import http = require('http');

export class Request {
	public accept: any;
	public baseUrl: string;
	public body: any;
	public cookies: any;
	public hostname: string;
	public ip: string;
	public method: string;
	public originalUrl: string;
	public params: {};
	public path: string;
	public query: any;

	constructor(private req: http.IncomingMessage) {
	}

	get ips(): Array<string> {
		// const proxy = this.app.proxy;
		const val = this.get('X-Forwarded-For');
		// return proxy && val ? val.split(/\s*,\s*/) : [];
		return [];
	}

	get socket(): any {
		return this.req.socket;
	}

	get protocol() {
		// const proxy = this.app.proxy;
		if (this.socket.encrypted) return 'https';
		// if (!proxy) return 'http';
		const proto = this.get('X-Forwarded-Proto') || 'http';
		return proto.split(/\s*,\s*/)[0];
	}

	get secure() {
		return 'https' == this.protocol;
	}

	get(field: string): string {
		const req = this.req;
		switch (field = field.toLowerCase()) {
			case 'referer':
			case 'referrer':
				return req.headers.referrer || req.headers.referer || '';
			default:
				return req.headers[field] || '';
		}
	}
}
