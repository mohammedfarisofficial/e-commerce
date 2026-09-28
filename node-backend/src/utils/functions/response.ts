import { Response } from "express";

/**
 * Standard API response envelope.
 */
interface ApiResponse<T> {
    success: boolean;
    data: T;
}

interface ApiErrorResponse {
    success: boolean;
    message: string;
}

function ok<T>(data: T): ApiResponse<T> {
    return { success: true, data };
}

function fail(message: string): ApiErrorResponse {
    return { success: false, message };
}

/* ── Success Responses ── */

export function JSON200<T>(res: Response, data: T): void {
    res.status(200).json(ok(data));
}

export function JSON201<T>(res: Response, data: T): void {
    res.status(201).json(ok(data));
}

/* ── Client Error Responses ── */

export function JSON400(res: Response, message = "Bad request"): void {
    res.status(400).json(fail(message));
}

export function JSON401(res: Response, message = "Unauthorized"): void {
    res.status(401).json(fail(message));
}

export function JSON403(res: Response, message = "Forbidden"): void {
    res.status(403).json(fail(message));
}

export function JSON404(res: Response, message = "Not found"): void {
    res.status(404).json(fail(message));
}

export function JSON409(res: Response, message = "Conflict"): void {
    res.status(409).json(fail(message));
}

export function JSON422(res: Response, message = "Unprocessable entity"): void {
    res.status(422).json(fail(message));
}

/* ── Server Error Responses ── */

export function JSON500(res: Response, message = "Internal server error"): void {
    res.status(500).json(fail(message));
}
