import { ClientEvents, ServerEvents } from "backend";
import { Socket as S } from "socket.io-client"

export type Socket = S<ServerEvents, ClientEvents>;