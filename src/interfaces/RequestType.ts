const RequestTypes = {
    "INCOMING": 0,
    "OUTGOING": 1,
} as const

type RequestType = keyof typeof RequestTypes

export { RequestTypes }

export type { RequestType }