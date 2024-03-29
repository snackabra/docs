declare const version = "1.1.25 (pre) build 02";
export interface SBServer {
    channel_server: string;
    channel_ws: string;
    storage_server: string;
    shard_server?: string;
}
export interface SBChannelHandle {
    channelId: SBChannelId;
    key: JsonWebKey;
    server?: string;
}
interface Dictionary<T> {
    [index: string]: T;
}
export type SB384Hash = string;
export type SBChannelId = SB384Hash;
export type SBUserId = SB384Hash;
interface ChannelData {
    roomId?: SBChannelId;
    channelId?: SBChannelId;
    ownerKey: string;
    encryptionKey: string;
    signKey: string;
    motherChannel?: SBChannelId;
    SERVER_SECRET?: string;
    size?: number;
}
interface ImageMetaData {
    imageId?: string;
    previewId?: string;
    imageKey?: string;
    previewKey?: string;
    previewNonce?: string;
    previewSalt?: string;
}
export interface ChannelMessage {
    type?: ChannelMessageTypes;
    keys?: ChannelKeyStrings;
    _id?: string;
    id?: string;
    timestamp?: number;
    timestampPrefix?: string;
    channelID?: SBChannelId;
    control?: boolean;
    encrypted?: boolean;
    encrypted_contents?: EncryptedContents;
    contents?: string;
    text?: string;
    sign?: string;
    image?: string;
    image_sign?: string;
    imageMetaData?: ImageMetaData;
    imageMetadata_sign?: string;
    motd?: string;
    ready?: boolean;
    roomLocked?: boolean;
    sender_pubKey?: JsonWebKey;
    sender_username?: string;
    system?: boolean;
    user?: {
        name: string;
        _id?: JsonWebKey;
    };
    verificationToken?: string;
    replyTo?: JsonWebKey;
    whisper?: string;
    whispered?: boolean;
    sendTo?: SBUserId;
}
export interface ChannelKeys {
    ownerKey: CryptoKey;
    ownerPubKeyX: string;
    guestKey?: CryptoKey;
    encryptionKey: CryptoKey;
    signKey: CryptoKey;
    lockedKey?: JsonWebKey;
    publicSignKey: CryptoKey;
    privateKey?: CryptoKey;
}
interface ChannelKeyStrings {
    encryptionKey: string;
    guestKey?: string;
    ownerKey: string;
    signKey: string;
    lockedKey?: string;
    error?: string;
}
export interface ChannelAdminData {
    room_id?: SBChannelId;
    join_requests: Array<JsonWebKey>;
    capacity: number;
}
export interface EncryptedContents {
    content: string | ArrayBuffer;
    iv: string | Uint8Array;
}
export interface EncryptedContentsBin {
    content: ArrayBuffer;
    iv: Uint8Array;
}
export type ChannelMessageTypes = 'ack' | 'keys' | 'invalid' | 'ready' | 'encrypted';
interface SBMessageContents {
    contents: string;
    image: string;
    imageMetaData?: ImageMetaData;
    image_sign?: string;
    imageMetadata_sign?: string;
    sender_pubKey?: JsonWebKey;
    sender_username?: string;
    encrypted: boolean;
    isVerfied: boolean;
    sign: string;
}
export type SBObjectType = 'f' | 'p' | 'b' | 't';
export declare namespace Interfaces {
    interface SBObjectHandle {
        [SB_OBJECT_HANDLE_SYMBOL]?: boolean;
        version?: '1';
        type: SBObjectType;
        id: string;
        key: string;
        id32?: Base62Encoded;
        key32?: Base62Encoded;
        verification: Promise<string> | string;
        iv?: Uint8Array | string;
        salt?: Uint8Array | string;
        fileName?: string;
        dateAndTime?: string;
        shardServer?: string;
        fileType?: string;
        lastModified?: number;
        actualSize?: number;
        savedSize?: number;
    }
}
export interface SBObjectMetadata {
    [SB_OBJECT_HANDLE_SYMBOL]: boolean;
    version: '1';
    type: SBObjectType;
    id: string;
    key: string;
    paddedBuffer: ArrayBuffer;
    iv: Uint8Array;
    salt: Uint8Array;
}
export declare class MessageBus {
    #private;
    bus: Dictionary<any>;
    subscribe(event: string, handler: CallableFunction): void;
    unsubscribe(event: string, handler: CallableFunction): void;
    publish(event: string, ...args: unknown[]): void;
}
export declare function encryptedContentsMakeBinary(o: EncryptedContents): EncryptedContentsBin;
export declare function getRandomValues(buffer: Uint8Array): Uint8Array;
export declare function base64ToArrayBuffer(str: string): Uint8Array;
export declare function compareBuffers(a: Uint8Array | ArrayBuffer | null, b: Uint8Array | ArrayBuffer | null): boolean;
declare function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array | null, variant?: 'b64' | 'url'): string;
type Base62Encoded = string & {
    _brand?: 'Base62Encoded';
};
export declare function base62ToArrayBuffer32(s: string): ArrayBuffer;
export declare function arrayBuffer32ToBase62(buffer: ArrayBuffer): string;
export declare function base62ToBase64(s: string): string;
export declare function base64ToBase62(s: string): string;
export declare function isBase62Encoded(value: string): value is Base62Encoded;
export declare function simpleRand256(): number;
export declare function simpleRandomString(n: number, code: string): string;
export declare function cleanBase32mi(s: string): string;
export declare function partition(str: string, n: number): void;
export declare function jsonParseWrapper(str: string | null, loc: string): any;
export interface SBPayload {
    [index: string]: ArrayBuffer;
}
export declare function extractPayloadV1(payload: ArrayBuffer): SBPayload;
export declare function assemblePayload(data: SBPayload): BodyInit | null;
export declare function extractPayload(payload: ArrayBuffer): SBPayload;
export declare function encodeB64Url(input: string): string;
export declare function decodeB64Url(input: string): string;
type knownKeysInfo = {
    hash: SB384Hash;
    pubKeyJson?: JsonWebKey;
    key?: CryptoKey;
};
declare class SBCrypto {
    #private;
    addKnownKey(key: JsonWebKey | SB384 | CryptoKey): Promise<void>;
    lookupKeyGlobal(hash: SB384Hash): knownKeysInfo | undefined;
    generateIdKey(buf: ArrayBuffer): Promise<{
        id: string;
        key: string;
    }>;
    extractPubKey(privateKey: JsonWebKey): JsonWebKey | null;
    sb384Hash(key?: JsonWebKey | CryptoKey): Promise<SB384Hash | undefined>;
    compareHashWithKey(hash: SB384Hash, key: JsonWebKey): Promise<boolean>;
    verifyChannelId(owner_key: JsonWebKey, channel_id: SBChannelId): Promise<boolean>;
    generateKeys(): Promise<CryptoKeyPair>;
    importKey(format: KeyFormat, key: BufferSource | JsonWebKey, type: 'ECDH' | 'AES' | 'PBKDF2', extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    exportKey(format: 'jwk', key: CryptoKey): Promise<JsonWebKey | undefined>;
    deriveKey(privateKey: CryptoKey, publicKey: CryptoKey, type: string, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
    encrypt(data: BufferSource, key: CryptoKey, _iv?: Uint8Array | null, returnType?: 'encryptedContents'): Promise<EncryptedContents>;
    encrypt(data: BufferSource, key: CryptoKey, _iv?: Uint8Array | null, returnType?: 'arrayBuffer'): Promise<ArrayBuffer>;
    wrap(k: CryptoKey, b: string, bodyType: 'string'): Promise<EncryptedContents>;
    wrap(k: CryptoKey, b: ArrayBuffer, bodyType: 'arrayBuffer'): Promise<EncryptedContents>;
    unwrap(k: CryptoKey, o: EncryptedContents, returnType: 'string'): Promise<string>;
    unwrap(k: CryptoKey, o: EncryptedContents, returnType: 'arrayBuffer'): Promise<ArrayBuffer>;
    sign(secretKey: CryptoKey, contents: string): Promise<string>;
    verify(verifyKey: CryptoKey, sign: string, contents: string): Promise<boolean>;
    str2ab(string: string): Uint8Array;
    ab2str(buffer: Uint8Array): string;
    compareKeys(key1: Dictionary<any>, key2: Dictionary<any>): boolean;
    lookupKey(key: JsonWebKey, array: Array<JsonWebKey>): number;
    channelKeyStringsToCryptoKeys(keyStrings: ChannelKeyStrings): Promise<ChannelKeys>;
}
declare const SB_MESSAGE_SYMBOL: unique symbol;
declare const SB_OBJECT_HANDLE_SYMBOL: unique symbol;
declare const sbCrypto: SBCrypto;
declare class SB384 {
    #private;
    ready: Promise<SB384>;
    sb384Ready: Promise<SB384>;
    constructor(key?: JsonWebKey);
    get readyFlag(): boolean;
    get exportable_pubKey(): JsonWebKey;
    get exportable_privateKey(): JsonWebKey;
    get privateKey(): CryptoKey;
    get ownerChannelId(): string;
    get hash(): string;
    get _id(): string;
}
declare class SBMessage {
    #private;
    ready: Promise<SBMessage>;
    channel: Channel;
    contents: SBMessageContents;
    [SB_MESSAGE_SYMBOL]: boolean;
    MAX_SB_BODY_SIZE: number;
    constructor(channel: Channel, bodyParameter?: SBMessageContents | string, sendToJsonWebKey?: JsonWebKey);
    get encryptionKey(): CryptoKey | undefined;
    get sendToPubKey(): JsonWebKey | undefined;
    send(): Promise<string>;
}
declare abstract class Channel extends SB384 {
    #private;
    channelReady: Promise<Channel>;
    motd?: string;
    locked?: boolean;
    owner: boolean;
    admin: boolean;
    adminData?: Dictionary<any>;
    verifiedGuest: boolean;
    userName: string;
    abstract send(message: SBMessage): Promise<string>;
    constructor(sbServer: SBServer, key?: JsonWebKey, channelId?: string);
    get keys(): ChannelKeys;
    get sbServer(): SBServer;
    get readyFlag(): boolean;
    get api(): this;
    get channelId(): string | undefined;
    get channelSignKey(): CryptoKey;
    getLastMessageTimes(): Promise<unknown>;
    getOldMessages(currentMessagesLength?: number, paginate?: boolean): Promise<Array<ChannelMessage>>;
    updateCapacity(capacity: number): Promise<any>;
    getCapacity(): Promise<any>;
    getStorageLimit(): Promise<any>;
    getMother(): Promise<any>;
    getJoinRequests(): Promise<any>;
    isLocked(): Promise<boolean>;
    setMOTD(motd: string): Promise<any>;
    getAdminData(): Promise<ChannelAdminData>;
    downloadData(): Promise<unknown>;
    uploadChannel(channelData: ChannelData): Promise<any>;
    authorize(ownerPublicKey: Dictionary<any>, serverSecret: string): Promise<any>;
    postPubKey(_exportable_pubKey: JsonWebKey): Promise<{
        success: boolean;
    }>;
    storageRequest(byteLength: number): Promise<Dictionary<any>>;
    lock(): Promise<unknown>;
    acceptVisitor(pubKey: string): Promise<unknown>;
    ownerKeyRotation(): void;
    budd(): Promise<SBChannelHandle>;
    budd(options: {
        keys?: JsonWebKey;
        storage?: number;
        targetChannel?: SBChannelId;
    }): Promise<SBChannelHandle>;
}
export declare class ChannelSocket extends Channel {
    #private;
    ready: Promise<ChannelSocket>;
    channelSocketReady: Promise<ChannelSocket>;
    constructor(sbServer: SBServer, onMessage: (m: ChannelMessage) => void, key?: JsonWebKey, channelId?: string);
    get status(): "CLOSED" | "CONNECTING" | "OPEN" | "CLOSING";
    set onMessage(f: (m: ChannelMessage) => void);
    get onMessage(): (m: ChannelMessage) => void;
    set enableTrace(b: boolean);
    send(msg: SBMessage | string): Promise<string>;
    get exportable_owner_pubKey(): CryptoKey;
}
export declare class ChannelEndpoint extends Channel {
    constructor(sbServer: SBServer, key?: JsonWebKey, channelId?: string);
    send(_m: SBMessage | string, _messageType?: 'string' | 'SBMessage'): Promise<string>;
    set onMessage(_f: CallableFunction);
}
export declare class SBObjectHandle implements SBObjectHandle {
    #private;
    version?: string | undefined;
    iv?: Uint8Array | string;
    salt?: Uint8Array | string;
    fileName?: string;
    dateAndTime?: string;
    shardServer?: string;
    fileType?: string;
    lastModified?: number;
    actualSize?: number;
    savedSize?: number;
    constructor(options: SBObjectHandle);
    set id(value: string);
    get id(): string;
    set key(value: string);
    get key(): string;
    set id32(value: Base62Encoded);
    set key32(value: Base62Encoded);
    get id32(): Base62Encoded;
    get key32(): Base62Encoded;
    set verification(value: Promise<string> | string);
    get verification(): Promise<string> | string;
    get type(): SBObjectType;
}
declare class StorageApi {
    #private;
    server: string;
    shardServer?: string;
    channelServer: string;
    constructor(server: string, channelServer: string, shardServer?: string);
    getObjectMetadata(buf: ArrayBuffer, type: SBObjectType): Promise<SBObjectMetadata>;
    storeObject(buf: BodyInit | Uint8Array, type: SBObjectType, roomId: SBChannelId, metadata?: SBObjectMetadata): Promise<Interfaces.SBObjectHandle>;
    storeRequest(fileId: string): Promise<ArrayBuffer>;
    storeData(type: string, fileId: string, iv: Uint8Array, salt: Uint8Array, storageToken: string, data: ArrayBuffer): Promise<Dictionary<any>>;
    fetchData(h: Interfaces.SBObjectHandle, returnType: 'string'): Promise<string>;
    fetchData(h: Interfaces.SBObjectHandle, returnType?: 'arrayBuffer'): Promise<ArrayBuffer>;
    retrieveImage(imageMetaData: ImageMetaData, controlMessages: Array<ChannelMessage>, imageId?: string, imageKey?: string, imageType?: SBObjectType): Promise<Dictionary<any>>;
}
declare class Snackabra {
    #private;
    constructor(args?: SBServer, DEBUG?: boolean);
    connect(onMessage: (m: ChannelMessage) => void, key?: JsonWebKey, channelId?: string): Promise<ChannelSocket>;
    create(sbServer: SBServer, serverSecret: string, keys?: JsonWebKey): Promise<SBChannelHandle>;
    get channel(): Channel;
    get storage(): StorageApi;
    get crypto(): SBCrypto;
    get version(): string;
}
export type { ChannelData, ChannelKeyStrings, ImageMetaData };
export { Channel, SBMessage, Snackabra, SBCrypto, SB384, arrayBufferToBase64, sbCrypto, version, };
export declare var SB: {
    Snackabra: typeof Snackabra;
    SBMessage: typeof SBMessage;
    Channel: typeof Channel;
    SBCrypto: typeof SBCrypto;
    SB384: typeof SB384;
    arrayBufferToBase64: typeof arrayBufferToBase64;
    sbCrypto: SBCrypto;
    version: string;
};
//# sourceMappingURL=snackabra.d.ts.map