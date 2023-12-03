export interface IMessage {
    content: string;
    author?: string;
    timestamp: number;
    file: any;
    filename: string | undefined;
}
