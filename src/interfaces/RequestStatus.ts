const RequestStatus = {
    "REJECTED": -1,
    "PENDING": 0,
    "APPROVED": 1
} as const

type RequestStatusType = keyof typeof RequestStatus

export { RequestStatus }

export type { RequestStatusType }