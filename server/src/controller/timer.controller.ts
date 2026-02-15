import type { Request, Response } from "express";
import * as TimerService from "../services/timer.service";

export async function getTimers(req: Request, res: Response) {
    try{
        const allTimers = await TimerService.getTimersService();
        res.json(allTimers);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function createTimer(req: Request, res: Response) {
    try {
        const { name, time } = req.body;
        const newTimer = await TimerService.createTimerService(name, time);
        res.status(201).json(newTimer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function deleteTimer(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const deleteTimer = await TimerService.deleteTimerService(id);
        res.json({ message: "Todo was deleted!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}