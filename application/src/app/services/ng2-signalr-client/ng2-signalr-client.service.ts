import { Injectable } from '@angular/core';

declare var $: any;

export class ConnectionOptions {
    // SignalR server URL
    public url: string;
    public hubName: string;
    public withCredentials?: boolean;
    public queries?: any;
    public allowJsonp?: boolean;
    public transport?: ConnectionTransportType[];
    constructor() {}
}

export enum ConnectionTransportType {
    webSockets,
    foreverFrame,
    serverSentEvents,
    longPolling
}

export class ErrorMessages {
    public static ErrMsgNoOptions: string = 'Connection options not found. An options is required to connect to a SignalR Hub';
    public static ErrMsgNoUrl: string     = 'SignalR server URL not found.';
    public static ErrMsgNoHubName: string = 'Hub name not found.'
    public static ErrMsgNojQuery: string  = 'jQuery not found. Ng2SignalRClientService requires jQuery. Ensure that jQuery is installed and available.'
    public static ErrMsgNoSignalR: string = 'SignalR not found. Ng2SignalRClientService requires SignalR. Ensure that SignalR is installed and available.'
}

class ConnectionTransport {
    public webSockets: string = 'webSockets';
    public foreverFrame: string = 'foreverFrame';
    public serverSentEvents: string = 'serverSentEvents';
    public longPolling: string = 'longPolling';
}


@Injectable()
export class Ng2SignalRClientService {
    public connectionOptions: ConnectionOptions = null;
    public connection: any = null;
    public hubProxy: any = null;

    public temphubName = 'Ng2SignalRHub';
    public tempurl = 'http://ng2-signalr-backend.azurewebsites.net/';

    constructor() { }

    public connect(connectionOptions?: ConnectionOptions) {
        this.validation(connectionOptions);
        if (connectionOptions != null) {
            this.connectionOptions = connectionOptions;
        }

        this.connection = $.hubConnection(this.connectionOptions.url);
        this.connection.start()
            .done( () => {
                console.log('connected');
            })
            .fail( (error) => {
                console.log(error);
            });
        
        // Get Hub proxy for later use (send data to SignalR server)
        this.hubProxy = this.connection.createHubProxy(this.connectionOptions.hubName);
    }

    public listen() {
        // Register a method that a signalR server calls.
    }

    public invoke() {

    }

    public disconnect() {

    }

    private validation(connectionOptions?: ConnectionOptions) {
        if (connectionOptions != null) {
            this.connectionOptions = connectionOptions;
        }

        if (this.connectionOptions == null) {
            throw new Error(ErrorMessages.ErrMsgNoOptions);
        } else if (this.connectionOptions.url == null || this.connectionOptions.url == '') {
            throw new Error(ErrorMessages.ErrMsgNoUrl);
        } else if (this.connectionOptions.hubName == null || this.connectionOptions.hubName == '') {
            throw new Error(ErrorMessages.ErrMsgNoHubName);
        } else if ($ === undefined) {
            throw new Error(ErrorMessages.ErrMsgNojQuery);
        } else if ($.hubConnection === undefined) {
            throw new Error(ErrorMessages.ErrMsgNoSignalR);
        }

    }

}

