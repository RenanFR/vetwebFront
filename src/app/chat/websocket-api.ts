import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ChatComponent } from './chat.component';

export class WebSocketAPI {

    wsEndpoint: string = 'http://localhost:8070/vetweb/api/vetwebws';

    messageTopic: string = '/topic/chat/*';

    stompClient: any;

    chatComponent: ChatComponent;

    lastContact: number;

    constructor(chatComponent: ChatComponent) {
        this.chatComponent = chatComponent;
    }

    public connect(userTopic: number): void {
        console.log('Connecting with web socket')
        let ws = new SockJS(this.wsEndpoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        let topicToSubscribe: string = _this.messageTopic.replace('*', userTopic.toString());
        this.lastContact = userTopic;
        _this.stompClient.connect({}, function (frame) {

            _this.stompClient.subscribe(topicToSubscribe, function (event) {
                _this.handleReceived(event);
            });

        }, this.handleError);
    }

    public disconnect(): void {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected from web socket");        
    }

    private handleError(error): void {
        console.log("Handling error  " + error)
        setTimeout(() => {
            this.connect(this.lastContact);
        }, 5000);
    }

    public sendMessage(message): void {
        console.log('Sending message ' + message);
        this.stompClient.send("/vetweb/message.add", {}, JSON.stringify(message));
    }  
    
    private handleReceived(message): void {
        console.log('Message received ' + message);
        const _this = this;
        _this.chatComponent.receive(JSON.parse(message.body));
    }

}