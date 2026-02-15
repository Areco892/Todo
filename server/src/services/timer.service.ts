import * as TimerModel from "../models/timer.model";

export async function getTimersService() {
    return await TimerModel.getAllTimers();
}

export async function createTimerService(name: string, time: string) {
    if (!name) {
        throw new Error("Name is required!");
    }
    return await TimerModel.createTimer(name, time);
}

export async function deleteTimerService(id: string) {
    return await TimerModel.deleteTimer(id);
}